// CET-4 词库 JSON → Markdown 转换脚本
const fs = require('fs');
const path = require('path');

const INPUT = process.env.TEMP + '/cet4.json';
const OUTPUT_DIR = path.join(__dirname, 'src/content/vocabulary');

// 已有词条（不覆盖）
const existing = new Set(fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')));

console.log(`已有 ${existing.size} 个词条，将跳过`);

const data = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));
console.log(`JSON 共有 ${data.length} 个词`);

let created = 0, skipped = 0, failed = 0;

for (const entry of data) {
  const word = (entry.word || '').trim();
  if (!word) { failed++; continue; }

  // 文件名：转小写 + 替换非 ASCII
  const filename = word.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.md';
  if (existing.has(filename.replace('.md', ''))) {
    skipped++;
    continue;
  }

  // 提取音标（从 phrases 或 translations 不一定有，置空）
  // 提取词性
  const pos = (entry.translations || []).map(t => t.type).filter(Boolean).join(' / ') || '';

  // 提取主释义
  const mainMeaning = (entry.translations || [])[0]?.translation || '';
  const allMeanings = (entry.translations || []).map(t => t.translation).join('；');

  // 提取词组（前 5 个）
  const phrases = (entry.phrases || []).slice(0, 5);
  const phraseText = phrases.map(p => `- ${p.phrase}: ${p.translation}`).join('\n');

  const content = `---
word: ${word}
phonetic: ""
pos: "${pos}"
level: 4
tags: [CET-4]
difficulty: medium
reviewed: 0
description: "${mainMeaning.replace(/"/g, '\\"')}"
---

# ${word}

**释义**：${allMeanings.replace(/\n/g, ' ')}

**英文释义**：${mainMeaning}

**词性**：${pos || '—'}

${phrases.length > 0 ? `**搭配 / 词组**：

${phraseText}` : ''}

> 来源：KyleBing/english-vocabulary 词库
`;

  try {
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), content, 'utf-8');
    created++;
  } catch (e) {
    console.error(`FAILED ${word}: ${e.message}`);
    failed++;
  }
}

console.log(`Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`);
console.log(`Total now: ${fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.md')).length}`);
