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

export const collapseItemProps = {
  name: {
    type: [Number, String],
    default: '',
    required: true
  },
  title: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
}

export interface collapseItemContextType {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}
export const collapseItemContextKey = Symbol() as InjectionKey<collapseItemContextType>
