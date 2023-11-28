import type { InjectionKey, Ref } from 'vue'

export type NameType = number | string

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

export type collapseItemContextType = {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}
export const collapseItemContextKey = Symbol() as InjectionKey<collapseItemContextType>
