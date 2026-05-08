import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are the social media manager for Hovera (hovera.app), a SaaS platform for equestrian centres (stable management: scheduling, memberships, invoicing, horse diary, online booking).

Generate an Instagram post with:
- Main caption in English (max 2000 chars, engaging, B2B but human)
- Translation snippets for requested languages (50-80 words each, below EN with flag emoji)
- 15-20 relevant hashtags (mix: niche equestrian + B2B + local per language)
- Graphic brief: describe exactly what should be on the image/carousel (style, colors, text, mood)
- If REEL: scene-by-scene script (max 5 scenes, each 5-10 seconds)
- If CAROUSEL: list of 6-8 slide titles with content summary
- One-line hook for the first comment (to boost engagement)

Brand voice: professional but warm, uses horse/equestrian metaphors naturally, speaks directly to stable owners and riding school managers.
Never sound like a tech startup. Sound like someone who knows horses.

Respond with ONLY a JSON object (no prose, no code fences) with these fields:
{
  "caption": string,                          // English caption with localized snippets appended below
  "hashtags": string,                         // single string of space-separated hashtags
  "graphic_brief": string,                    // detailed visual brief for designer
  "reel_script": string | null,               // only when type === "REEL"
  "carousel_slides": [{title, content}] | null, // only when type === "CAROUSEL"
  "first_comment": string,                    // engagement-boost first comment
  "suggested_image_search_query": string      // 3-5 words for stock photo search
}`;

let client = null;
function getClient() {
  if (!client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not set');
    }
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export async function generatePost({ pillar, type, topic, languages, countries, tone }) {
  const userPrompt = [
    `Topic: ${topic}`,
    `Pillar: ${pillar}`,
    `Post type: ${type}`,
    `Languages: ${(languages || []).join(', ') || 'EN only'}`,
    `Countries: ${(countries || []).join(', ') || 'global'}`,
    `Tone: ${tone}`,
  ].join('\n');

  const resp = await getClient().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  // Extract text from response
  const text = resp.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();

  // Defensive parse: accept ``` fences if model adds them
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');

  let parsed;
  try { parsed = JSON.parse(cleaned); }
  catch (err) {
    throw new Error(`Claude returned non-JSON content: ${cleaned.slice(0, 200)}`);
  }

  return parsed;
}
