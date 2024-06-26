import type { App } from 'vue'
import VCollapse from './Collapse.vue'
import VCollapseItem from './CollapseItem.vue'

VCollapse.install = (app: App) => {
  app.component(VCollapse.name as string, VCollapse)
}
VCollapseItem.install = (app: App) => {
  app.component(VCollapseItem.name as string, VCollapseItem)
}

export default VCollapse
export { VCollapseItem }
export * from './types'
