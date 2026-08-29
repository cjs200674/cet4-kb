// 给 6 个真题 md 加 frontmatter
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/exams');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const titles = {
  'cet4-2023-06-1.md': '2023 年 6 月真题 第 1 部分（写作 + 听力）',
  'cet4-2023-06-2.md': '2023 年 6 月真题 第 2 部分（阅读 Section A/B/C）',
  'cet4-2023-06-3.md': '2023 年 6 月真题 第 3 部分（翻译）',
  'cet4-2023-12-1.md': '2023 年 12 月真题 第 1 部分（写作 + 听力）',
  'cet4-2023-12-2.md': '2023 年 12 月真题 第 2 部分（阅读 Section A/B/C）',
  'cet4-2023-12-3.md': '2023 年 12 月真题 第 3 部分（翻译）',
};

const descriptions = {
  'cet4-2023-06-1.md': 'CET-4 2023.06 - 写作（在线教育利弊）+ 听力 Section A/B/C（25 min）',
  'cet4-2023-06-2.md': 'CET-4 2023.06 - 阅读 Section A（选词填空）/ B（段落匹配）/ C（仔细阅读 2 篇）',
  'cet4-2023-06-3.md': 'CET-4 2023.06 - 翻译（中国终身教育）',
  'cet4-2023-12-1.md': 'CET-4 2023.12 - 写作 + 听力 Section A/B/C',
  'cet4-2023-12-2.md': 'CET-4 2023.12 - 阅读 Section A/B/C',
  'cet4-2023-12-3.md': 'CET-4 2023.12 - 翻译',
};

for (const f of files) {
  const fullPath = path.join(dir, f);
  let content = fs.readFileSync(fullPath, 'utf-8');
  if (content.startsWith('---')) {
    console.log(`SKIP (already has frontmatter): ${f}`);
    continue;
  }
  const m = f.match(/cet4-(\d{4})-(\d{2})-(\d)\.md/);
  if (!m) { console.log(`SKIP (no match): ${f}`); continue; }
  const year = m[1], month = m[2], part = m[3];
  const slug = `${year}.${month}-${part}`;
  const fm = `---
title: "${titles[f] || f}"
examId: "${year}.${month}-${part}"
year: ${year}
month: ${month}
part: ${part}
description: "${descriptions[f] || ''}"
source: wamich/english-exem-md
tags: [真题, ${year}-${month}]
difficulty: hard
reviewed: 0
---

`;
  content = fm + content;
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`Updated: ${f} → examId=${year}.${month}-${part}`);
}
