import { defineComponent } from 'vue'
const RenderVnode = defineComponent({
  props: {
    vnode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    return () => props.vnode
  }
})

export default RenderVnode
