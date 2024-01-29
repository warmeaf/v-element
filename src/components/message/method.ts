import type { MessageProps } from './types'
import { h, render } from 'vue'
import Message from './Message.vue'

export const createMessage = (props: MessageProps) => {
  const container = document.createElement('div')
  const vnode = h(Message, props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
}
