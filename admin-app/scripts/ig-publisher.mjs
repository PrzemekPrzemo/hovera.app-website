#!/usr/bin/env node
/**
 * Cron-friendly publisher. Run from cron every minute or 5 minutes.
 * Scans data/posts/*.json and publishes any post whose:
 *   status === 'approved' AND scheduled_time <= now
 *
 * Usage:
 *   cd admin-app && node scripts/ig-publisher.mjs
 *
 * Cron line (every 5 minutes):
 *   *\/5 * * * * cd /var/www/vhosts/hovera.app/admin-app && /usr/bin/node scripts/ig-publisher.mjs >> /var/log/hovera-ig.log 2>&1
 */
import 'dotenv/config';
import { listPosts, savePost } from '../lib/storage.mjs';
import { publishImage, publishCarousel, publishReel, postFirstComment } from '../lib/instagram.mjs';

const now = Date.now();

function isDue(post) {
  if (post.status !== 'approved') return false;
  if (!post.scheduled_time) return false;
  return new Date(post.scheduled_time).getTime() <= now;
}

async function publishOne(post) {
  console.log(`[publisher] publishing ${post.id} (${post.type})`);
  const fullCaption = `${post.caption}\n\n${post.hashtags}`.trim();

  let result;
  if (post.type === 'CAROUSEL') {
    if (!post.images || post.images.length < 2) throw new Error('carousel needs 2+ images');
    result = await publishCarousel({ images: post.images, caption: fullCaption });
  } else if (post.type === 'REEL') {
    if (!post.video_url) throw new Error('reel needs video_url');
    result = await publishReel({ video_url: post.video_url, caption: fullCaption });
  } else {
    if (!post.image_url) throw new Error('image post needs image_url');
    result = await publishImage({ image_url: post.image_url, caption: fullCaption });
  }

  post.status = 'published';
  post.published_at = new Date().toISOString();
  post.ig_post_id = result.id || null;
  await savePost(post);

  if (post.first_comment && result.id) {
    try { await postFirstComment({ ig_post_id: result.id, text: post.first_comment }); }
    catch (err) { console.warn(`[publisher] first-comment failed for ${post.id}:`, err.message); }
  }

  console.log(`[publisher] ✓ ${post.id} → IG ${result.id}`);
}

async function main() {
  const all = await listPosts();
  const due = all.filter(isDue);
  if (due.length === 0) {
    console.log(`[publisher] ${new Date().toISOString()} — nothing due (${all.length} total posts)`);
    return;
  }
  console.log(`[publisher] ${due.length} post(s) due`);

  for (const post of due) {
    try { await publishOne(post); }
    catch (err) {
      console.error(`[publisher] ✗ ${post.id}: ${err.message}`);
      post.status = 'failed';
      post.last_error = err.message;
      await savePost(post);
    }
  }
}

main().catch((err) => { console.error('[publisher] FATAL', err); process.exit(1); });
