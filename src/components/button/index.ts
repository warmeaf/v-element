import type { App } from 'vue'
import VButton from './Button.vue'

VButton.install = (app: App) => {
  app.component(VButton.name as string, VButton)
}

export default VButton
// 导出类型文件
export * from './props'
