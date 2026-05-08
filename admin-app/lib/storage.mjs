import { promises as fs } from 'node:fs';
import path from 'node:path';

const DATA_DIR = process.env.DATA_DIR || './data';
const POSTS_DIR = path.join(DATA_DIR, 'posts');

async function ensureDir() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
}

function safeId(id) {
  return id.replace(/[^a-z0-9_-]/gi, '_');
}

function postPath(id) {
  return path.join(POSTS_DIR, `${safeId(id)}.json`);
}

export async function listPosts() {
  await ensureDir();
  const files = await fs.readdir(POSTS_DIR);
  const posts = [];
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    try {
      const raw = await fs.readFile(path.join(POSTS_DIR, f), 'utf8');
      posts.push(JSON.parse(raw));
    } catch (err) {
      console.warn(`(storage) skipping ${f}: ${err.message}`);
    }
  }
  posts.sort((a, b) => (b.scheduled_time || b.created_at || '').localeCompare(a.scheduled_time || a.created_at || ''));
  return posts;
}

export async function getPost(id) {
  await ensureDir();
  try {
    const raw = await fs.readFile(postPath(id), 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

export async function savePost(post) {
  await ensureDir();
  if (!post.id) throw new Error('post.id required');
  await fs.writeFile(postPath(post.id), JSON.stringify(post, null, 2), 'utf8');
  return post;
}

export async function deletePost(id) {
  try { await fs.unlink(postPath(id)); return true; }
  catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

export function generatePostId(scheduledTime, slug) {
  const d = scheduledTime ? new Date(scheduledTime) : new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const ymd = `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  const hh = pad(d.getUTCHours());
  const cleanSlug = (slug || 'post').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  return `post_${ymd}_${hh}_${cleanSlug || 'post'}`;
}
