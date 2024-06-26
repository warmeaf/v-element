import type { App } from 'vue'
import VMessage from './Message.vue'
import { createMessage, closeAll } from './method'

VMessage.install = (app: App) => {
  app.component(VMessage.name as string, VMessage)
}

export default VMessage
export { createMessage, closeAll }
export * from './types'
