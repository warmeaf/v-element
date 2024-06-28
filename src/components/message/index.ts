import type { App } from 'vue'
import VMessage from './src/Message.vue'
import { createMessage, closeAll } from './src/method'

VMessage.install = (app: App) => {
  app.component(VMessage.name as string, VMessage)
}

export default VMessage
export { createMessage, closeAll }
export * from './src/types'
