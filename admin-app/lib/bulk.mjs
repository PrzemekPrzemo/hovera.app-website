import Anthropic from '@anthropic-ai/sdk';
import { generatePost } from './claude.mjs';
import { savePost } from './storage.mjs';
import { generateSchedule } from './schedule.mjs';

const TOPICS_SYSTEM = `You are the content strategist for Hovera (hovera.app), a SaaS platform for equestrian centres (stable management: scheduling, memberships, invoicing, horse diary, online booking).

Generate exactly N content ideas for Instagram posts, distributed across these 5 pillars:
- problem_solution (~30%)
- education (~30%)
- social_proof (~15%)
- horse_content (~15%)
- behind_scenes (~10%)

Each idea must be:
- Concrete (not generic). "How to onboard a new boarder in 30 min" — yes. "Tips for stable owners" — no.
- Mixed depth: ~40% tactical (workflow, finance, compliance), ~30% practical riding/horse care, ~30% brand-building moments and stories.
- Distinct angles. Never two posts on the same exact subtopic.

Brand voice: professional but warm, knows horses, speaks to stable owners and riding school managers, never "tech bro".

Available languages from caller: {LANGUAGES}. Choose the best fit per idea (some topics resonate more in PL, others in DE, etc.).

Respond with ONLY a JSON array (no prose, no code fences):
[
  {"pillar":"education","topic":"How to onboard a new boarding client in 30 minutes","tone":"educational","languages":["EN"]},
  ...
]
`;

let client = null;
function getClient() {
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

export async function suggestTopics({ count, languages, pillars }) {
  const sys = TOPICS_SYSTEM
    .replace('N', String(count))
    .replace('{LANGUAGES}', languages.join(', '));

  const userMsg = pillars && pillars.length > 0
    ? `Use only these pillars: ${pillars.join(', ')}.`
    : 'Use all 5 pillars in the proportions above.';

  const resp = await getClient().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: sys,
    messages: [{ role: 'user', content: userMsg }],
  });

  const text = resp.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();

  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');
  let parsed;
  try { parsed = JSON.parse(cleaned); }
  catch (err) { throw new Error(`topic suggestion: non-JSON content: ${cleaned.slice(0, 200)}`); }

  if (!Array.isArray(parsed)) throw new Error('topic suggestion: not an array');
  return parsed.slice(0, count);
}

/**
 * Bulk-generate posts:
 *  1. Ask Claude for `count` topic ideas
 *  2. For each topic, call generatePost() to get full post
 *  3. Schedule them on Mon/Wed/Fri at the requested hour starting from `start`
 *  4. Save as drafts (status=draft, image_url=null)
 *
 * Returns { generated, errors }.
 */
export async function bulkGenerate({ count, start, hour = 9, daysOfWeek = [1, 3, 5], languages = ['EN'], pillars = null, type = 'IMAGE' }) {
  const topics = await suggestTopics({ count, languages, pillars });
  const slots = generateSchedule({ start, count: topics.length, daysOfWeek, hour });

  const generated = [];
  const errors = [];

  for (let i = 0; i < topics.length; i++) {
    const t = topics[i];
    const slot = slots[i];
    try {
      const gen = await generatePost({
        pillar: t.pillar,
        type,
        topic: t.topic,
        languages: t.languages || languages,
        countries: [],
        tone: t.tone || 'educational',
      });

      // build post envelope and persist
      const id = makeId(slot, t.topic);
      const now = new Date().toISOString();
      const post = {
        id,
        type,
        scheduled_time: slot,
        caption: gen.caption,
        hashtags: gen.hashtags,
        image_url: null,
        images: [],
        video_url: null,
        languages: t.languages || languages,
        pillar: t.pillar,
        graphic_brief: gen.graphic_brief,
        first_comment: gen.first_comment,
        reel_script: gen.reel_script || null,
        carousel_slides: gen.carousel_slides || null,
        suggested_image_search_query: gen.suggested_image_search_query || '',
        status: 'draft',
        created_at: now,
        updated_at: now,
        published_at: null,
        ig_post_id: null,
      };
      await savePost(post);
      generated.push({ id, topic: t.topic, pillar: t.pillar, scheduled_time: slot });
    } catch (err) {
      errors.push({ topic: t.topic, error: err.message });
    }
  }

  return { generated, errors, total_topics: topics.length };
}

function makeId(scheduledTime, topic) {
  const d = new Date(scheduledTime);
  const pad = (n) => String(n).padStart(2, '0');
  const ymd = `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  const hh = pad(d.getUTCHours());
  const slug = topic.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  return `post_${ymd}_${hh}_${slug || 'post'}`;
}
