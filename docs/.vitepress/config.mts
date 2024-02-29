import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VElement UI 组件库',
  description: 'A VitePress Site',
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/' },
      { text: '组件', link: '/components/button' }
    ],

    sidebar: [
      {
        text: '基础组件',
        items: [{ text: 'Button', link: '/components/button' }]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/warmeaf/v-element' }]
  }
})
