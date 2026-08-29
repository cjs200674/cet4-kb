# CET-4 备考知识库

> 大学英语四级（CET-4）系统化备考知识库，基于 Astro + Markdown + GitHub Pages。

## 🌐 在线访问

部署后访问：https://chu.github.io/cet4-kb

## ✨ 功能

| 模块 | 说明 |
|---|---|
| 📚 词汇 | 高频词 + 词组 + 易混词辨析，带 Anki 风格间隔重复卡片 |
| 📖 阅读 | 考点分析 + 长难句 + 历年真题 |
| 🎧 听力 | 场景词 + 真题原文 + 听力脚本 |
| ✏️ 语法 | 重点语法 + 易错点 |
| 📝 写作 | 模板 + 高分范文 |
| 📊 进度 | 学习进度仪表盘（本地 localStorage） |

## 🛠 技术栈

- **Astro 5** — 静态站点生成，内容源是 Markdown
- **Content Collections** — 类型安全的内容管理
- **GitHub Actions + Pages** — 自动部署
- **localStorage** — 客户端进度跟踪（无需后端）
- **零 JS 框架** — 纯 Astro Island，轻量

## 📁 目录结构

```
src/content/
├── vocabulary/   # 词汇（按主题/词根分组）
├── reading/      # 阅读（按题型/年份）
├── listening/    # 听力（按场景/年份）
├── grammar/      # 语法（按专题）
└── writing/      # 写作（按题型）
```

每篇内容 frontmatter 包含：难度、标签、掌握度、上次复习时间等。

## 🚀 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

## 📝 内容规范

新增词汇条目示例：

```markdown
---
word: abundant
phonetic: /əˈbʌndənt/
pos: adj
level: 4
tags: [高频词, 写作]
difficulty: medium
reviewed: 0
---

# abundant

**释义**：丰富的，充裕的

**例句**：The country has abundant natural resources.

**记忆法**：ab-（加强）+ und（波浪）+-ant → 浪多的 → 丰富的

**搭配**：abundant in / abundant resources
```
