import { defineCollection, z } from 'astro:content';

// 通用 frontmatter schema（title 可选——vocabulary 用 word 字段代替）
const baseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  tags: z.array(z.string()).default([]),
  reviewed: z.number().int().min(0).default(0),
  lastReviewed: z.string().optional(),
  created: z.string().optional(),
});

const vocabulary = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    word: z.string(),
    phonetic: z.string().optional(),
    pos: z.string().optional(), // part of speech
    level: z.number().int().min(1).max(6).default(4),
  }),
});

const reading = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    source: z.string().optional(),
    year: z.number().int().optional(),
    passageType: z.string().optional(), // 选词填空 / 长篇阅读 / 仔细阅读 / 段落匹配
  }),
});

const listening = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    source: z.string().optional(),
    year: z.number().int().optional(),
    section: z.string().optional(), // 短篇新闻 / 长对话 / 听力篇章 / 场景词
    audioUrl: z.string().optional(),
  }),
});

const grammar = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    topic: z.string().optional(),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    templateType: z.string().optional(), // 议论文 / 图表作文 / 书信
    band: z.number().min(0).max(15).optional(), // 作文分数
  }),
});

const exams = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    examId: z.string(), // 如 2023.06-1
    year: z.number().int(),
    month: z.number().int(),
    part: z.number().int(), // 1=写作+听力, 2=阅读, 3=翻译
    source: z.string().optional(),
  }),
});

export const collections = { vocabulary, reading, listening, grammar, writing, exams };
