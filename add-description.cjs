// 给所有 vocabulary markdown 加 description frontmatter
const fs = require('fs');
const path = require('path');

const dir = 'C:/装修小程序/大学学习/cet4-kb/src/content/vocabulary';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let updated = 0, skipped = 0;
for (const f of files) {
  const fullPath = path.join(dir, f);
  const content = fs.readFileSync(fullPath, 'utf-8');
  if (content.match(/^description:/m)) {
    skipped++;
    continue;
  }
  // 提取 **释义**：xxx
  const m = content.match(/\*\*释义\*\*：([^\n]+)/);
  if (!m) {
    console.log(`SKIP (no 释义): ${f}`);
    continue;
  }
  let meaning = m[1].trim();
  // 转义双引号
  meaning = meaning.replace(/"/g, '\\"');
  // 在 --- 后第二行插入 description
  const newContent = content.replace(/^---\r?\n/, (match) => `${match}description: "${meaning}"\n`);
  if (newContent !== content) {
    fs.writeFileSync(fullPath, newContent, 'utf-8');
    updated++;
  }
}
console.log(`Updated: ${updated}, Skipped: ${skipped}`);
