import { promises as fs } from 'node:fs';
import path from 'node:path';

const GRAPH = 'https://graph.facebook.com/v18.0';
const TOKEN_FILE = path.join(process.env.DATA_DIR || './data', 'tokens.json');

function token() {
  return process.env.IG_ACCESS_TOKEN;
}

function igUserId() {
  return process.env.IG_BUSINESS_ACCOUNT_ID;
}

async function igFetch(url, init = {}) {
  const res = await fetch(url, init);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body.error?.message || res.statusText;
    const err = new Error(`IG API ${res.status}: ${msg}`);
    err.body = body;
    throw err;
  }
  return body;
}

/** Returns { is_valid, expires_at, scopes } from /debug_token */
export async function getTokenStatus() {
  const t = token();
  if (!t) return { is_valid: false, error: 'IG_ACCESS_TOKEN not set' };
  const appId = process.env.IG_APP_ID;
  const appSecret = process.env.IG_APP_SECRET;
  if (!appId || !appSecret) return { is_valid: false, error: 'IG_APP_ID / IG_APP_SECRET not set' };

  const debugTokenUrl = `${GRAPH}/debug_token?input_token=${encodeURIComponent(t)}&access_token=${encodeURIComponent(`${appId}|${appSecret}`)}`;
  const r = await igFetch(debugTokenUrl);
  const data = r.data || {};
  return {
    is_valid: !!data.is_valid,
    expires_at: data.expires_at ? new Date(data.expires_at * 1000).toISOString() : null,
    days_to_expiry: data.expires_at ? Math.round((data.expires_at * 1000 - Date.now()) / 86400000) : null,
    scopes: data.scopes || [],
    raw: data,
  };
}

/** Refreshes a long-lived user token. Returns new token + saves to tokens.json */
export async function refreshToken() {
  const t = token();
  if (!t) throw new Error('IG_ACCESS_TOKEN not set');
  const appId = process.env.IG_APP_ID;
  const appSecret = process.env.IG_APP_SECRET;
  if (!appId || !appSecret) throw new Error('IG_APP_ID / IG_APP_SECRET not set');

  const url = `${GRAPH}/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(appId)}&client_secret=${encodeURIComponent(appSecret)}&fb_exchange_token=${encodeURIComponent(t)}`;
  const data = await igFetch(url);
  await fs.writeFile(TOKEN_FILE, JSON.stringify({
    refreshed_at: new Date().toISOString(),
    expires_in: data.expires_in,
    note: 'New long-lived token. Update IG_ACCESS_TOKEN in .env and restart.',
    new_token: data.access_token,
  }, null, 2), 'utf8');
  return data;
}

/** Publish IMAGE post: create container, then publish */
export async function publishImage({ image_url, caption }) {
  const userId = igUserId();
  if (!userId) throw new Error('IG_BUSINESS_ACCOUNT_ID not set');

  const containerUrl = `${GRAPH}/${userId}/media?image_url=${encodeURIComponent(image_url)}&caption=${encodeURIComponent(caption || '')}&access_token=${encodeURIComponent(token())}`;
  const container = await igFetch(containerUrl, { method: 'POST' });
  const containerId = container.id;
  if (!containerId) throw new Error('container creation failed');

  const publishUrl = `${GRAPH}/${userId}/media_publish?creation_id=${encodeURIComponent(containerId)}&access_token=${encodeURIComponent(token())}`;
  const result = await igFetch(publishUrl, { method: 'POST' });
  return result;
}

/** Publish CAROUSEL: create child containers, then carousel container, then publish */
export async function publishCarousel({ images, caption }) {
  const userId = igUserId();
  if (!userId) throw new Error('IG_BUSINESS_ACCOUNT_ID not set');
  if (!Array.isArray(images) || images.length < 2) throw new Error('carousel requires 2+ images');

  const childIds = [];
  for (const url of images) {
    const u = `${GRAPH}/${userId}/media?image_url=${encodeURIComponent(url)}&is_carousel_item=true&access_token=${encodeURIComponent(token())}`;
    const r = await igFetch(u, { method: 'POST' });
    childIds.push(r.id);
  }

  const carouselUrl = `${GRAPH}/${userId}/media?media_type=CAROUSEL&children=${childIds.join(',')}&caption=${encodeURIComponent(caption || '')}&access_token=${encodeURIComponent(token())}`;
  const container = await igFetch(carouselUrl, { method: 'POST' });
  const containerId = container.id;

  const publishUrl = `${GRAPH}/${userId}/media_publish?creation_id=${encodeURIComponent(containerId)}&access_token=${encodeURIComponent(token())}`;
  return igFetch(publishUrl, { method: 'POST' });
}

/** Publish REEL: create container with video_url, wait for processing, publish */
export async function publishReel({ video_url, caption }) {
  const userId = igUserId();
  if (!userId) throw new Error('IG_BUSINESS_ACCOUNT_ID not set');

  const containerUrl = `${GRAPH}/${userId}/media?media_type=REELS&video_url=${encodeURIComponent(video_url)}&caption=${encodeURIComponent(caption || '')}&share_to_feed=true&access_token=${encodeURIComponent(token())}`;
  const container = await igFetch(containerUrl, { method: 'POST' });
  const containerId = container.id;

  // Reels need processing time — poll status_code until FINISHED (max ~2 min)
  for (let attempt = 0; attempt < 24; attempt++) {
    await new Promise((r) => setTimeout(r, 5000));
    const statusUrl = `${GRAPH}/${containerId}?fields=status_code&access_token=${encodeURIComponent(token())}`;
    const status = await igFetch(statusUrl);
    if (status.status_code === 'FINISHED') break;
    if (status.status_code === 'ERROR') throw new Error('reel processing failed');
  }

  const publishUrl = `${GRAPH}/${userId}/media_publish?creation_id=${encodeURIComponent(containerId)}&access_token=${encodeURIComponent(token())}`;
  return igFetch(publishUrl, { method: 'POST' });
}

export async function postFirstComment({ ig_post_id, text }) {
  const url = `${GRAPH}/${ig_post_id}/comments?message=${encodeURIComponent(text)}&access_token=${encodeURIComponent(token())}`;
  return igFetch(url, { method: 'POST' });
}

/** Returns last 5 published posts */
export async function listRecentMedia(limit = 5) {
  const userId = igUserId();
  if (!userId) throw new Error('IG_BUSINESS_ACCOUNT_ID not set');
  const url = `${GRAPH}/${userId}/media?fields=id,caption,media_type,timestamp,permalink&limit=${limit}&access_token=${encodeURIComponent(token())}`;
  return igFetch(url);
}
