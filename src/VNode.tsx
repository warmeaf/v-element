import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VNode',
  props: {
    msg: {
      type: String,
      default: '',
      required: true
    }
  },
  setup($props) {
    const count = ref('hello')
    return () => (
      <div>
        <h1>{$props.msg}</h1>
        <p>{count.value}</p>
      </div>
    )
  }
})
