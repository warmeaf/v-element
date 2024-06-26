/*
 * @Author: warmleaf 1391040917@qq.com
 * @Date: 2024-02-22 23:03:31
 * @LastEditors: warmleaf 1391040917@qq.com
 * @LastEditTime: 2024-03-04 21:49:01
 * @FilePath: \v-element\src\components\message\method.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { CreateMessageProps, MessageContext } from './types'
import { h, render, shallowReactive } from 'vue'
import Message from './Message.vue'
import useZIndex from '../../../hooks/useZIndex'

let seed = 0
const instances: MessageContext[] = shallowReactive([])
const { nextZIndex } = useZIndex()
export const createMessage = (props: CreateMessageProps) => {
  let timer: NodeJS.Timeout
  // 为什么以下写法在重复调用 createMessage 时，只会创建最后一个？
  // const vnode = h(Message, props)
  // render(vnode, document.body)
  seed++
  const id = `message_${seed}`

  const onDestroy = () => {
    const index = instances.findIndex((context) => context.id === id)
    if (index === -1) return
    instances.splice(index, 1)

    // 这段代码是如何发挥作用的呢？看源码 render 函数的实现
    // https://github.com/vuejs/core/blob/d276a4f3e914aaccc291f7b2513e5d978919d0f9/packages/runtime-core/src/renderer.ts#L2356
    timer = setTimeout(() => {
      render(null, container)
      clearTimeout(timer)
    }, 300)
  }
  const newProps = { ...props, onDestroy, id, zIndex: nextZIndex() }

  const container = document.createElement('div')
  const vnode = h(Message, newProps)

  // 在运行 render 函数时，Message 组件内的代码会被执行
  render(vnode, container)
  // console.log(vnode === container._vnode) // true

  document.body.appendChild(container.firstElementChild!)

  // 手动销毁
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const instance = {
    id,
    vnode,
    props: newProps,
    vm: vnode.component!,
    destory: manualDestroy
  }
  instances.push(instance)
  return instance
}

export const getLastMessage = () => {
  // return instances[instances.length - 1]
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  console.log(id, idx, instances.length)
  if (idx <= 0) {
    return 0
  } else {
    const pre = idx - 1
    return instances[pre].vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destory()
  })
}
