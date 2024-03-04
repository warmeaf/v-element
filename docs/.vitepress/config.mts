/*
 * @Author: warmleaf 1391040917@qq.com
 * @Date: 2023-12-10 20:45:33
 * @LastEditors: warmleaf 1391040917@qq.com
 * @LastEditTime: 2024-03-04 21:21:35
 * @FilePath: \v-element\docs\.vitepress\config.mts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Collapse', link: '/components/collapse' },
          { text: 'Message', link: '/components/message' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/warmeaf/v-element' }]
  }
})
