import type { App } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VButton from '@/components/button'
import VCollapse, { VCollapseItem } from '@/components/collapse'
import VMessage, { createMessage, closeAll as closeMessageAll } from '@/components/message'
import VTooltip from '@/components/tooltip'
import VDropdown from '@/components/dropdown'

library.add(fas)

const components = [VButton, VCollapse, VCollapseItem, VMessage, VTooltip, VDropdown]
const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name as string, component)
  })
}

import './style/index.css'

// 导出单独组件或方法
export {
  VButton,
  VCollapse,
  VCollapseItem,
  VMessage,
  VTooltip,
  VDropdown,
  createMessage,
  closeMessageAll
}

// 支持全局注册
export default {
  install
}
