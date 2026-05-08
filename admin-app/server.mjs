import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { basicAuthMiddleware } from './lib/auth.mjs';
import { listPosts, getPost, savePost, deletePost, generatePostId } from './lib/storage.mjs';
import { generatePost } from './lib/claude.mjs';
import {
  getTokenStatus,
  refreshToken,
  publishImage,
  publishCarousel,
  publishReel,
  postFirstComment,
  listRecentMedia,
} from './lib/instagram.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json({ limit: '2mb' }));
app.disable('x-powered-by');

const auth = basicAuthMiddleware();

// ─── API ──────────────────────────────────────────────────────────────
const api = express.Router();
api.use(auth);

api.get('/posts', async (_req, res) => {
  const posts = await listPosts();
  res.json({ posts });
});

api.get('/posts/:id', async (req, res) => {
  const post = await getPost(req.params.id);
  if (!post) return res.status(404).json({ error: 'not found' });
  res.json({ post });
});

api.post('/posts', async (req, res) => {
  const body = req.body || {};
  const id = body.id || generatePostId(body.scheduled_time, body.slug || body.topic || 'post');
  const now = new Date().toISOString();
  const post = {
    id,
    type: body.type || 'IMAGE',
    scheduled_time: body.scheduled_time || null,
    caption: body.caption || '',
    hashtags: body.hashtags || '',
    image_url: body.image_url || null,
    images: body.images || [],
    video_url: body.video_url || null,
    languages: body.languages || ['EN'],
    pillar: body.pillar || 'education',
    graphic_brief: body.graphic_brief || '',
    first_comment: body.first_comment || '',
    reel_script: body.reel_script || null,
    carousel_slides: body.carousel_slides || null,
    suggested_image_search_query: body.suggested_image_search_query || '',
    status: body.status || 'draft',
    created_at: body.created_at || now,
    updated_at: now,
    published_at: body.published_at || null,
    ig_post_id: body.ig_post_id || null,
  };
  await savePost(post);
  res.json({ post });
});

api.patch('/posts/:id', async (req, res) => {
  const existing = await getPost(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not found' });
  const merged = { ...existing, ...(req.body || {}), id: existing.id, updated_at: new Date().toISOString() };
  await savePost(merged);
  res.json({ post: merged });
});

api.delete('/posts/:id', async (req, res) => {
  const ok = await deletePost(req.params.id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

// AI generation
api.post('/generate', async (req, res) => {
  const { pillar, type, topic, languages, countries, tone, scheduled_time } = req.body || {};
  if (!topic) return res.status(400).json({ error: 'topic is required' });

  try {
    const generated = await generatePost({
      pillar: pillar || 'education',
      type: type || 'IMAGE',
      topic,
      languages: languages || ['EN'],
      countries: countries || [],
      tone: tone || 'educational',
    });

    const id = generatePostId(scheduled_time, topic);
    const post = {
      id,
      type: type || 'IMAGE',
      scheduled_time: scheduled_time || null,
      caption: generated.caption,
      hashtags: generated.hashtags,
      image_url: null,
      images: [],
      video_url: null,
      languages: languages || ['EN'],
      pillar: pillar || 'education',
      graphic_brief: generated.graphic_brief,
      first_comment: generated.first_comment,
      reel_script: generated.reel_script || null,
      carousel_slides: generated.carousel_slides || null,
      suggested_image_search_query: generated.suggested_image_search_query || '',
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: null,
      ig_post_id: null,
    };
    await savePost(post);
    res.json({ post, raw: generated });
  } catch (err) {
    console.error('[generate]', err);
    res.status(500).json({ error: err.message });
  }
});

// IG publish
api.post('/publish/:id', async (req, res) => {
  const post = await getPost(req.params.id);
  if (!post) return res.status(404).json({ error: 'not found' });

  const fullCaption = `${post.caption}\n\n${post.hashtags}`.trim();

  try {
    let result;
    if (post.type === 'CAROUSEL') {
      if (!post.images || post.images.length < 2) {
        return res.status(400).json({ error: 'carousel needs at least 2 images' });
      }
      result = await publishCarousel({ images: post.images, caption: fullCaption });
    } else if (post.type === 'REEL') {
      if (!post.video_url) return res.status(400).json({ error: 'reel needs video_url' });
      result = await publishReel({ video_url: post.video_url, caption: fullCaption });
    } else {
      if (!post.image_url) return res.status(400).json({ error: 'image post needs image_url' });
      result = await publishImage({ image_url: post.image_url, caption: fullCaption });
    }

    post.status = 'published';
    post.published_at = new Date().toISOString();
    post.ig_post_id = result.id || null;
    await savePost(post);

    if (post.first_comment && result.id) {
      try { await postFirstComment({ ig_post_id: result.id, text: post.first_comment }); }
      catch (err) { console.warn('first comment failed:', err.message); }
    }

    res.json({ post, ig: result });
  } catch (err) {
    console.error('[publish]', err);
    post.status = 'failed';
    post.last_error = err.message;
    await savePost(post);
    res.status(500).json({ error: err.message, post });
  }
});

// IG status / token
api.get('/ig/status', async (_req, res) => {
  try {
    const [status, recent] = await Promise.all([
      getTokenStatus(),
      listRecentMedia(5).catch(() => ({ data: [] })),
    ]);
    res.json({ status, recent: recent.data || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

api.post('/ig/refresh-token', async (_req, res) => {
  try {
    const data = await refreshToken();
    res.json({ ok: true, data, note: 'New long-lived token saved to data/tokens.json. Copy it to .env IG_ACCESS_TOKEN and restart the server.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/admin', api);

// ─── Static admin UI ──────────────────────────────────────────────────
app.use('/admin/social', auth, express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// SPA-ish fallback: any /admin/social/* request that didn't match a file → index.html
app.get(/^\/admin\/social(\/.*)?$/, auth, (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/healthz', (_req, res) => res.json({ ok: true, t: new Date().toISOString() }));

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => {
  console.log(`hovera-admin-app listening on ${HOST}:${PORT}`);
});
