#!/usr/bin/env node
/**
 * EN-translation helper. Reads a PL article, generates an EN skeleton with:
 *  - Translated frontmatter (title, description) — uses the supplied `--title` / `--desc`
 *  - Internal links rewritten /produkt/X → /en/produkt/X, /cennik → /en/cennik etc.
 *  - PLN currency converted to EUR using a fixed rate
 *  - The body is left as PL — meant to be replaced by manual translation
 *
 * Usage:
 *  node scripts/scaffold-en-translation.mjs <slug> <"EN title"> <"EN description">
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const [, , slug, enTitle, enDescription] = process.argv;
if (!slug || !enTitle || !enDescription) {
  console.error('Usage: node scripts/scaffold-en-translation.mjs <slug> <"EN title"> <"EN description">');
  process.exit(1);
}

const SRC = `src/content/blog/pl/${slug}.md`;
const DEST = `src/content/blog/en/${slug}.md`;

if (!existsSync(SRC)) {
  console.error(`PL source not found: ${SRC}`);
  process.exit(1);
}

const TAG_MAP = {
  'Operacje': 'Operations',
  'Karnety': 'Passes',
  'Finanse': 'Finance',
  'Konie i opieka': 'Horse care',
  'Pensjonat': 'Boarding',
  'Sport': 'Sport',
  'Szkółka': 'Riding school',
  'Migracja': 'Migration',
  'Compliance': 'Compliance',
  'Marketing': 'Marketing',
  'Logistyka': 'Logistics',
  'BHP i bezpieczeństwo': 'Health & safety',
};

const raw = await readFile(SRC, 'utf8');
const m = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
if (!m) { console.error('Cannot parse PL frontmatter'); process.exit(1); }

const fmRaw = m[1];
const body = m[2];

const date = (fmRaw.match(/^date:\s*"?([^"\n]+)"?/m) || [])[1] || '';
const tagsLine = (fmRaw.match(/^tags:\s*\[([^\]]+)\]/m) || [])[1] || '';
const plTags = tagsLine.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
const enTags = plTags.map(t => TAG_MAP[t] || t).filter(Boolean);

let translatedBody = body
  // currency & numbers
  .replace(/(\d[\d  ]*) zł/g, (_, n) => {
    const num = Number(n.replace(/[\s ]/g, ''));
    if (Number.isFinite(num)) return `€${Math.round(num / 4.3).toLocaleString('en-GB')}`;
    return _;
  })
  // internal links
  .replace(/\]\(\/produkt\//g, '](/en/produkt/')
  .replace(/\]\(\/dla\//g, '](/en/dla/')
  .replace(/\]\(\/vs\//g, '](/en/vs/')
  .replace(/\]\(\/cennik/g, '](/en/cennik')
  .replace(/\]\(\/kontakt/g, '](/en/kontakt')
  .replace(/\]\(\/kalkulator-roi/g, '](/en/kalkulator-roi')
  .replace(/\]\(\/blog\//g, '](/en/blog/')
  .replace(/\]\(\/co-nowego/g, '](/en/co-nowego')
  .replace(/\]\(\/demo/g, '](/en/demo');

const enFm = `---
locale: en
slug: ${slug}
title: "${enTitle.replace(/"/g, '\\"')}"
description: "${enDescription.replace(/"/g, '\\"')}"
date: "${date}"
author: "Przemek"
tags: [${enTags.map(t => `"${t}"`).join(', ')}]
---
`;

await writeFile(DEST, enFm + '\n<!-- TODO: manual EN translation of body. Currency was auto-converted. -->\n\n' + translatedBody + '\n');
console.log(`✅ Scaffolded ${DEST}`);
console.log(`   Date: ${date}`);
console.log(`   Tags: [${enTags.join(', ')}]`);
