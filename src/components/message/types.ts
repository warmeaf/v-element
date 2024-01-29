import type { VNode } from 'vue'

export interface MessageProps {
  message: string | VNode
  duration?: number // 可选的持续时间属性
  showClose?: boolean // 是否显示关闭按钮
  type?: 'success' | 'warning' | 'info' | 'error' // 消息类型
  onDestroy: () => void // 消息被销毁时的回调函数
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy'>
