#!/usr/bin/env node
/**
 * CLI bulk generator.
 *
 * Usage:
 *   cd admin-app
 *   node scripts/bulk-generate.mjs --count 30 --start 2026-05-15 \
 *     --languages EN,PL --hour 9 --days 1,3,5
 *
 * Flags:
 *   --count       number of posts (default 12)
 *   --start       earliest date YYYY-MM-DD (required)
 *   --hour        UTC hour (default 9)
 *   --days        comma-separated day numbers, 0=Sun..6=Sat (default 1,3,5 = Mon/Wed/Fri)
 *   --languages   comma-separated language codes (default EN)
 *   --pillars     restrict to specific pillars (default: all 5)
 *   --type        IMAGE | CAROUSEL | REEL (default IMAGE)
 */
import 'dotenv/config';
import { bulkGenerate } from '../lib/bulk.mjs';

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0) return def;
  return process.argv[i + 1];
}

function csv(value, def) {
  if (!value) return def;
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

const start = arg('start');
if (!start) {
  console.error('Missing --start YYYY-MM-DD');
  process.exit(1);
}

const opts = {
  count: Number(arg('count', '12')),
  start,
  hour: Number(arg('hour', '9')),
  daysOfWeek: csv(arg('days'), ['1', '3', '5']).map(Number),
  languages: csv(arg('languages'), ['EN']),
  pillars: csv(arg('pillars'), null),
  type: arg('type', 'IMAGE'),
};

console.log('[bulk] starting with', JSON.stringify(opts, null, 2));
const t0 = Date.now();
const result = await bulkGenerate(opts);
const dt = Math.round((Date.now() - t0) / 1000);

console.log(`[bulk] done in ${dt}s — generated ${result.generated.length} / ${result.total_topics}`);
if (result.errors.length > 0) {
  console.log('[bulk] errors:');
  for (const e of result.errors) console.log(`  - ${e.topic}: ${e.error}`);
}
console.log('[bulk] schedule:');
for (const g of result.generated) {
  console.log(`  ${g.scheduled_time}  ·  ${g.pillar.padEnd(18)}  ·  ${g.topic}`);
}
