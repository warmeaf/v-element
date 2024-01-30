import type { CreateMessageProps, MessageContext } from './types'
import { h, render } from 'vue'
import Message from './Message.vue'

let seed = 1
const contexts: MessageContext[] = []
export const createMessage = (props: CreateMessageProps) => {
  // 为什么以下写法在重复调用 createMessage 时，只会创建最后一个？
  // const vnode = h(Message, props)
  // render(vnode, document.body)
  seed++
  const id = `message_${seed}`

  const onDestroy = () => {
    const index = contexts.findIndex((context) => context.id === id)
    if (index === -1) return
    contexts.splice(index, 1)

    // 这段代码是如何发挥作用的呢？看源码 render 函数的实现
    // https://github.com/vuejs/core/blob/d276a4f3e914aaccc291f7b2513e5d978919d0f9/packages/runtime-core/src/renderer.ts#L2356
    render(null, container)
  }
  const newProps = { ...props, onDestroy }

  const container = document.createElement('div')
  const vnode = h(Message, newProps)
  render(vnode, container)
  // console.log(vnode === container._vnode) // true
  document.body.appendChild(container.firstElementChild!)

  contexts.push({
    id,
    vnode,
    props: newProps
  })
}
