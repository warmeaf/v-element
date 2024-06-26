import type { App } from 'vue'
import VDropdown from './src/Dropdown.vue'

VDropdown.install = (app: App) => {
  app.component(VDropdown.name as string, VDropdown)
}

export default VDropdown
export * from './src/types'
