import type { InjectionKey, Ref } from 'vue'

export type NameType = number | string

export interface CollapseProps {
  modelValue: NameType[]
  accordion?: boolean
}

export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void
  (e: 'change', value: NameType[]): void
}

export interface CollapseItemProps {
  // 唯一标识
  name: NameType
  // 标题
  title?: string
  // 是否禁用
  disabled?: boolean
}

export interface CollapseItemContextType {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}
export const collapseItemContextKey =
  Symbol() as InjectionKey<CollapseItemContextType>
