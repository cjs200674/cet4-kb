import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 部署：仓库名决定 base 路径
// 如果是 username.github.io 类型的仓库，base 留空
// 如果是一般仓库（这里是 cet4-kb），需要加 /cet4-kb 前缀
const REPO = 'cet4-kb';

export default defineConfig({
  site: `https://${process.env.GITHUB_ACTOR || 'chu'}.github.io`,
  base: `/${REPO}`,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 4096,
    },
  },
});
