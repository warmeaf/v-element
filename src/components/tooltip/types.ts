import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean
  transition?: string
  options?: Options
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstance {
  open: () => void
  close: () => void
}
