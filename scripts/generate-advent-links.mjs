// Writes the short link pages for the AI Advent Calendar:
//   rabauer.dev/advent        -> the calendar
//   rabauer.dev/advent-01 ... rabauer.dev/advent-24 -> that door on the calendar
//
// These pages are generic on purpose. This repo is public, and the doors stay hidden until
// their day: no title, ticket, habit or picture of any door may appear here. The calendar
// site decides by date whether a door opens or shows its teaser.
import fs from 'node:fs';
import path from 'node:path';

const CALENDAR_URL = 'https://johannesrabauer.github.io/ai-advent-calendar/';
const SITE_URL = 'https://rabauer.dev';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DESCRIPTION =
  '24 small experiments with AI coding agents. One door opens every day, 1 to 24 December 2026.';

const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function page({ slug, title, target, linkText }) {
  const url = `${SITE_URL}/${slug}/`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(DESCRIPTION)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${esc(target)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(DESCRIPTION)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${SITE_URL}/advent/hero.jpg">
<meta property="og:image:width" content="1152">
<meta property="og:image:height" content="768">
<meta property="og:image:alt" content="A night village with a workshop on the hill and one lit window">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<style>body{margin:0;background:#0f1a2e;color:#f4efe4;font:1.0625rem/1.6 system-ui,sans-serif}main{max-width:640px;margin:0 auto;padding:48px 16px}a{color:#f6b54a}</style>
</head>
<body>
<main>
<p>${esc(linkText)}</p>
<p><a href="${esc(target)}">${esc(target)}</a></p>
</main>
<script>location.replace(${JSON.stringify(target)});</script>
</body>
</html>
`;
}

function write(slug, html) {
  const dir = path.join(PUBLIC_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
}

write(
  'advent',
  page({
    slug: 'advent',
    title: 'AI Advent Calendar 2026',
    target: CALENDAR_URL,
    linkText: 'Taking you to the AI Advent Calendar.',
  }),
);

for (let n = 1; n <= 24; n += 1) {
  // advent-01 is the link used in the videos; advent-1 to advent-9 work too, for people who type it short.
  const slugs = [`advent-${String(n).padStart(2, '0')}`];
  if (n < 10) slugs.push(`advent-${n}`);
  for (const slug of slugs) {
    write(
      slug,
      page({
        slug,
        title: `AI Advent Calendar 2026: door ${n}`,
        target: `${CALENDAR_URL}#door-${n}`,
        linkText: `Taking you to door ${n} of the AI Advent Calendar.`,
      }),
    );
  }
}

console.log('✓ Advent calendar link pages → public/advent, public/advent-01 to advent-24, public/advent-1 to advent-9');
