#!/usr/bin/env node
// Scans public/news/*.md, parses frontmatter, and writes public/news/manifest.json
// Run automatically as part of the build via "prebuild" npm script.

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const newsDir = join(__dirname, '..', 'public', 'news');
const manifestPath = join(newsDir, 'manifest.json');

const files = readdirSync(newsDir)
  .filter((f) => f.endsWith('.md'))
  .sort()
  .reverse(); // newest first (alphabetical desc — works with YYYY-MM-DD prefix)

const articles = files.map((filename) => {
  const raw = readFileSync(join(newsDir, filename), 'utf-8');
  const { data } = matter(raw);
  const slug = filename.replace(/\.md$/, '');

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date).slice(0, 10) : null,
    excerpt: data.excerpt ?? null,
    tags: data.tags ?? [],
    image: data.image ?? null,
  };
});

writeFileSync(manifestPath, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`[news-manifest] Generated ${articles.length} article(s) → public/news/manifest.json`);
