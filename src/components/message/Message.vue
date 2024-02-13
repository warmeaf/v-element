<template>
  <transition :name="transitionName" @enter="onEnter" @after-leave="onAfterLeave">
    <div
      v-show="visible"
      class="v-message"
      :class="{
        [`v-message--${type}`]: type,
        'is-closable': showClose
      }"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
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
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { MessageProps } from './types'
import RenderVnode from '../common/RenderVnode'
import VIcon from '../icon/Icon.vue'
import { getLastBottomOffset } from './method'
import useEventListener from '../..//hooks/useEventListener'

defineOptions({
  name: 'VMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  message: '',
  duration: 3000,
  showClose: false,
  offset: 20,
  transitionName: 'fade-up'
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
let timer: any
const startTimer = () => {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
const clearTimer = () => {
  timer && clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
  // startTimer()
})

const handleClose = () => {
  visible.value = false
}

const keydown = (e: Event) => {
  const event = e as KeyboardEvent
  if (event.key === 'Escape') {
    handleClose()
  }
}
useEventListener(document, 'keydown', keydown)
watch(visible, (newVal) => {
  !newVal && props.onDestroy()
})

const onEnter = () => {
  height.value = messageRef.value!.getBoundingClientRect().height
  startTimer()
}
const onAfterLeave = () => {
  // props.onDestroy()
}

defineExpose({
  bottomOffset,
  visible
})
</script>
