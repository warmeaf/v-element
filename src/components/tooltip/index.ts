import type { App } from 'vue'
import VTooltip from './Tooltip.vue'

VTooltip.install = (app: App) => {
  app.component(VTooltip.name as string, VTooltip)
}

export default VTooltip
export * from './types'