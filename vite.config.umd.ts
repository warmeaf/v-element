import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // 指定打包目录
    outDir: 'dist/umd',
    // 库模式配置
    lib: {
      // 配置打包入口
      entry: resolve(__dirname, 'src/index.ts'),
      // 全局变量名称
      name: 'VElement',
      // 文件名称
      fileName: 'v-element',
      // 指定打包格式
      formats: ['umd']
    },
    rollupOptions: {
      // 只将vue作为打包排除的外部依赖
      // @fortawesome/fontawesome-svg-core 和 @fortawesome/free-solid-svg-icons 都被打包进了产物里
      external: ['vue'],
      output: {
        // 指定输出的模块使用命名导出
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === 'style.css') {
            return 'index.css'
          }
          return chunkInfo.name as string
        }
      }
    }
  }
})
