const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

function extractStyle(c) {
  const m = c.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
  if (!m) return null;
  return m.map(s => s.replace(/<\/?style[^>]*>/g, '')).join('\n');
}

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.astro')) {
      const c = fs.readFileSync(p, 'utf-8');
      const css = extractStyle(c);
      if (!css) continue;
      try {
        postcss.parse(css);
      } catch (err) {
        console.log('BAD:', p, '|', err.message);
      }
    }
  }
}
walk('src');
