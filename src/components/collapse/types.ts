export type NameType = number | string

export const collapseItemProps = {
  name: {
    type: [Number, String],
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
