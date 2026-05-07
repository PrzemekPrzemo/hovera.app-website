#!/usr/bin/env node
/**
 * Batch processor: konwertuje surowe artykuły z _blog-artykuly/do-przerobienia/
 * na pliki gotowe do src/content/blog/pl/.
 *
 * Każdy plik źródłowy ma format:
 *   # Tytuł (H1)
 *
 *   > **Slug:** `/blog/foo-bar`
 *   > **Meta description:** ...
 *   > **Primary keyword:** ...
 *   > **Słowa pomocnicze:** ...
 *   > **Czas czytania:** ...
 *   > **Author:** ...
 *
 *   ---
 *
 *   ...treść markdown...
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '_blog-artykuly/do-przerobienia';
const DEST = 'src/content/blog/pl';
const STAGE = '_blog-artykuly/gotowe-do-cms';

// Skip files (already-published articles, content strategy, readme, mobile)
const SKIP = new Set([
  '00-content-strategy.md',
  'PRZECZYTAJ.md',
  '09-aplikacja-mobilna-stajnia.md', // mobile content currently hidden
  // Batch 1 already published — skip in subsequent runs
  '01-grafik-szkolki-jezdzieckiej.md',
  '02-karnety-w-stajni.md',
  '03-ksef-dla-stajni-2026.md',
  '04-excel-czy-system-stajnia.md',
  '05-jak-przejsc-z-excela-na-system.md',
  '06-dziennik-konia.md',
  '07-stawki-jazda-konna-polska-2026.md',
  '08-pensjonat-vs-szkolka.md',
  '10-porownanie-systemow-zarzadzania-stajnia.md',
  '27-marketing-stajnia.md',
  '28-otwieranie-szkolki.md',
  '29-pasza-dla-koni-koszty.md',
  '30-transport-koni.md',
  '31-sprzedaz-konia-dokumentacja.md',
  '32-bhp-stajnia.md',
  '33-ubezpieczenia-stajnia.md',
  '34-praca-z-dziecmi-szkolka.md',
  '35-integracja-z-ksiegowoscia.md',
  '36-kolonie-konne-organizacja.md',
]);

// Tags inferred from primary keyword + cluster
function inferTags(slug, keyword, hpw) {
  const tags = new Set();
  const text = `${slug} ${keyword} ${hpw || ''}`.toLowerCase();
  if (/ksef|vida|faktur|finans|ksiegow/.test(text)) tags.add('Finanse');
  if (/karnet/.test(text)) tags.add('Karnety');
  if (/grafik|kalendar|booking|rezerwac/.test(text)) tags.add('Operacje');
  if (/dziennik|hodowla|reproduk|paszport/.test(text)) tags.add('Konie i opieka');
  if (/pensjonat|livery|boks/.test(text)) tags.add('Pensjonat');
  if (/sport|trening|zawod/.test(text)) tags.add('Sport');
  if (/szkolk|szkółk|otwiera|kolonie|dzieckj?em/.test(text)) tags.add('Szkółka');
  if (/excel|porownan|porównan|przejsc|przejść/.test(text)) tags.add('Migracja');
  if (/rodo|gdpr|bezpiecz|ubezpieczen/.test(text)) tags.add('Compliance');
  if (/marketing|seo|google/.test(text)) tags.add('Marketing');
  if (/transport/.test(text)) tags.add('Logistyka');
  if (/bhp|wypadek/.test(text)) tags.add('BHP i bezpieczeństwo');
  if (/sprzedaz|sprzedaż|pasza/.test(text)) tags.add('Operacje');
  if (/kpi|metryk|wskazn/.test(text)) tags.add('Operacje');
  if (/cennik|psychologi|lojalno|programy/.test(text)) tags.add('Marketing');
  if (/event|imprez|sklep|tack/.test(text)) tags.add('Marketing');
  if (/ekolog|esg|zielon/.test(text)) tags.add('Compliance');
  if (/zrebak|zrebięt|trening/.test(text)) tags.add('Konie i opieka');
  if (/sukcesj|rozbudow|miast/.test(text)) tags.add('Operacje');
  if (tags.size === 0) tags.add('Operacje');
  return [...tags].slice(0, 4);
}

function escapeYaml(s) {
  return s.replace(/"/g, '\\"');
}

function parseMetaBlock(raw) {
  const lines = raw.split('\n');
  // Skip H1 line, optional blank, the > metadata block, separator ---
  let i = 0;
  while (i < lines.length && !lines[i].startsWith('# ')) i++;
  if (i === lines.length) return null;
  const title = lines[i].replace(/^#\s+/, '').trim();
  i++;
  // Skip blank
  while (i < lines.length && lines[i].trim() === '') i++;
  // Read metadata block (lines starting with >)
  const meta = {};
  while (i < lines.length && lines[i].startsWith('>')) {
    const line = lines[i].replace(/^>\s*/, '').trim();
    const match = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
    if (match) {
      const key = match[1].toLowerCase().replace(/[ąćęłńóśźż]/g, c => ({ą:'a',ć:'c',ę:'e',ł:'l',ń:'n',ó:'o',ś:'s',ź:'z',ż:'z'}[c] || c));
      meta[key] = match[2].trim().replace(/^`|`$/g, '');
    }
    i++;
  }
  // Skip blank + separator
  while (i < lines.length && (lines[i].trim() === '' || lines[i].trim() === '---')) i++;
  const body = lines.slice(i).join('\n').trim();
  return { title, meta, body };
}

function buildFrontmatter({ title, slug, description, date, tags }) {
  return `---
locale: pl
slug: ${slug}
title: "${escapeYaml(title)}"
description: "${escapeYaml(description)}"
date: "${date}"
author: "Przemek"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---
`;
}

// Replace external register link with local /kontakt CTA (we don't show external app yet)
function softenExternalCTAs(body) {
  return body
    .replace(/https:\/\/app\.hovera\.app\/register/g, '/kontakt')
    .replace(/Wypróbuj Hoverę za 0 zł — 14 dni bez karty/g, 'Zapytaj o dostęp');
}

// Remove "Działa też offline" / mobile claims that crept into bodies
function softenMobileClaims(body) {
  return body
    .replace(/, na komputerze i telefonie\./g, '.')
    .replace(/Wszystko w jednym miejscu, na komputerze i telefonie\./g, 'Wszystko w jednym miejscu.')
    .replace(/Hovera w kieszeni\./g, 'Hovera dostępna w przeglądarce.');
}

async function main() {
  const files = (await readdir(SRC)).filter(f => f.endsWith('.md') && !SKIP.has(f));
  files.sort();

  // Distribute publication dates: 2 articles/week, starting Tue/Thu.
  // Batch 1 covered 2026-04-07 to 2026-06-09 — batch 2 starts after.
  const startDate = new Date('2026-06-16'); // Tuesday after batch 1
  const slotPattern = [0, 2]; // Tue, Thu
  const dates = [];
  for (let week = 0; dates.length < files.length; week++) {
    for (const dayOffset of slotPattern) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + week * 7 + dayOffset);
      dates.push(d.toISOString().slice(0, 10));
      if (dates.length >= files.length) break;
    }
  }

  await mkdir(DEST, { recursive: true });
  await mkdir(STAGE, { recursive: true });

  const summary = [];
  let i = 0;
  for (const file of files) {
    const raw = await readFile(join(SRC, file), 'utf8');
    const parsed = parseMetaBlock(raw);
    if (!parsed) {
      console.warn(`⚠️  ${file}: no parseable metadata, skipping`);
      continue;
    }
    const { title, meta, body } = parsed;
    if (!meta.slug) {
      console.warn(`⚠️  ${file}: no slug, skipping`);
      continue;
    }
    const slug = meta.slug.replace(/^\/blog\//, '').replace(/\/$/, '');
    const description = meta['meta description'] || '';
    const keyword = meta['primary keyword'] || '';
    const hpw = meta['slowa pomocnicze'] || '';
    const tags = inferTags(slug, keyword, hpw);
    const date = dates[i++];

    const fm = buildFrontmatter({ title, slug, description, date, tags });
    const cleanedBody = softenMobileClaims(softenExternalCTAs(body));
    const finalContent = fm + '\n' + cleanedBody + '\n';

    const outName = `${slug}.md`;
    await writeFile(join(DEST, outName), finalContent);
    await writeFile(join(STAGE, outName), finalContent);

    summary.push({ slug, title, date, tags });
  }

  console.log('\n✅ Przetworzonych artykułów:', summary.length);
  console.log('📅 Daty publikacji od', summary[0]?.date, 'do', summary.at(-1)?.date);
  console.table(summary);
}

main().catch(err => { console.error(err); process.exit(1); });
