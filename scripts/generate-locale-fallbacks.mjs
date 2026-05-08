#!/usr/bin/env node
/**
 * Post-build: generate fallback redirect pages for de/ and fr/ for any URL that
 * exists in en/ but not in the target locale. Redirect target is /en/<path>.
 *
 * Idea: if user clicks a nav link like /de/produkt/kalendarz that we haven't
 * translated to DE/FR yet, send them to /en/produkt/kalendarz instead of 404.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['de', 'fr'];

async function walk(dir, base = dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full, base)));
    } else if (entry.isFile() && entry.name === 'index.html') {
      out.push(path.relative(base, full));
    }
  }
  return out;
}

function buildRedirectHtml(targetUrl) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta http-equiv="refresh" content="0; url=${targetUrl}">
<link rel="canonical" href="${targetUrl}">
<meta name="robots" content="noindex">
<style>body{font-family:system-ui,sans-serif;padding:2rem;text-align:center;color:#555}</style>
</head>
<body>
<p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>…</p>
<script>location.replace(${JSON.stringify(targetUrl)});</script>
</body>
</html>
`;
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function run() {
  const sourceDir = path.join(DIST, SOURCE_LOCALE);
  if (!(await exists(sourceDir))) {
    console.log(`(skip) source dir ${sourceDir} not found`);
    return;
  }

  const enFiles = await walk(sourceDir);
  let createdTotal = 0;

  for (const locale of TARGET_LOCALES) {
    const targetDir = path.join(DIST, locale);
    let created = 0;
    for (const rel of enFiles) {
      // rel e.g. "produkt/kalendarz/index.html"
      const targetPath = path.join(targetDir, rel);
      if (await exists(targetPath)) continue;
      // Build redirect URL: /en/<rel-without-trailing-index.html>
      const cleanPath = rel.replace(/\/?index\.html$/, '');
      const targetUrl = '/' + SOURCE_LOCALE + (cleanPath ? '/' + cleanPath : '');
      const html = buildRedirectHtml(targetUrl);
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, html, 'utf8');
      created++;
    }
    console.log(`${locale}/ — generated ${created} fallback redirects to /${SOURCE_LOCALE}/`);
    createdTotal += created;
  }

  console.log(`Total: ${createdTotal} fallback files`);
}

run().catch((err) => { console.error(err); process.exit(1); });
