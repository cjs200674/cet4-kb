// 删除 false.md 等异常文件
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/content/vocabulary');

const badNames = new Set(['false.md', 'true.md', 'null.md', 'undefined.md']);
const removed = [];

for (const f of fs.readdirSync(dir)) {
  if (badNames.has(f)) {
    fs.unlinkSync(path.join(dir, f));
    removed.push(f);
  }
}

console.log(`Removed ${removed.length} bad files: ${removed.join(', ')}`);
