// 用于测试 vue3 的插件系统
import type { App } from 'vue'
import VButton from '@/components/button/Button.vue'

export default {
  install(app: App) {
    app.config.globalProperties.$echo = (name: string) => {
      return `hello ${name}`
    }

    app.component('VfButton', VButton)

    app.provide('test', 'app provide test')
  }
}
