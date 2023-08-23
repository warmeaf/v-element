import type { ButtonHTMLAttributes, PropType } from 'vue'

export function typeValidator(type: string): boolean {
  return ['default', 'primary', 'info', 'success', 'warning', 'danger'].includes(type)
}

export function sizeValidator(size: string): boolean {
  return ['normal', 'mini', 'small', 'large'].includes(size)
}

export function nativeTypeValidator(nativeType: string): boolean {
  return ['button', 'reset', 'submit'].includes(nativeType)
}

export type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'normal' | 'mini' | 'small' | 'large'

export interface Props {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
}

export const props = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
    validator: typeValidator
  },
  nativeType: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
    validator: nativeTypeValidator
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'normal',
    validator: sizeValidator
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  }
}
