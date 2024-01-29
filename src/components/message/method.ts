import type { CreateMessageProps } from './types'
import { h, render } from 'vue'
import Message from './Message.vue'

export const createMessage = (props: CreateMessageProps) => {
  // 为什么以下写法在重复调用 createMessage 时，只会创建最后一个？
  // const vnode = h(Message, props)
  // render(vnode, document.body)

  const onDestroy = () => {
    // 这段代码是如何发挥作用的呢？
    render(null, container)
  }
  const newProps = { ...props, onDestroy }

  const container = document.createElement('div')
  const vnode = h(Message, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
}
