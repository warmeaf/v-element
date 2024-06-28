import type { App } from 'vue'
import VCollapse from './src/Collapse.vue'
import VCollapseItem from './src/CollapseItem.vue'

VCollapse.install = (app: App) => {
  app.component(VCollapse.name as string, VCollapse)
}
VCollapseItem.install = (app: App) => {
  app.component(VCollapseItem.name as string, VCollapseItem)
}

export default VCollapse
export { VCollapseItem }
export * from './src/types'
