<template>
  <div
    v-show="visible"
    class="v-message"
    :class="{
      [`v-message--${type}`]: type,
      'is-closable': showClose
    }"
    ref="messageRef"
    :style="cssStyle"
  >
    <div class="v-message__content">
      <slot>
        <render-vnode :vnode="message" />
      </slot>
    </div>
    <div v-if="showClose" class="v-message__close">
      <v-icon @click.stop="handleClose" icon="xmark" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import type { MessageProps } from './types'
import RenderVnode from '../common/RenderVnode'
import VIcon from '../icon/Icon.vue'
import { getLastBottomOffset } from './method'

defineOptions({
  name: 'VMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  message: '',
  duration: 3000,
  showClose: false,
  offset: 20
})

const messageRef = ref<HTMLDivElement | null>()

// 消息窗体的高度
const height = ref(0)
// 向上的偏移量
const topOffset = computed(() => getLastBottomOffset(props.id) + props.offset)
// 预留给下一个窗体的偏移量
const bottomOffset = computed(() => topOffset.value + height.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

const visible = ref(false)
const startTimer = () => {
  if (props.duration === 0) return
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

onMounted(async () => {
  visible.value = true
  await nextTick()
  height.value = messageRef.value!.getBoundingClientRect().height
  startTimer()
})

const handleClose = () => {
  visible.value = false
}

watch(visible, (newVal) => {
  !newVal && props.onDestroy()
})

defineExpose({
  bottomOffset,
  visible
})
</script>
