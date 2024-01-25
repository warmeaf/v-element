<template>
  <div
    v-if="visible"
    class="v-message"
    :class="{
      [`v-message--${type}`]: type,
      'is-closable': showClose
    }"
  >
    <div class="v-message__content">
      <slot>
        <render-vnode :vnode="message" />
      </slot>
    </div>
    <div v-if="showClose" class="v-message__close">
      <v-icon icon="xmark" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MessageProps } from './types'
import RenderVnode from '../common/RenderVnode'
import VIcon from '../icon/Icon.vue'
defineOptions({
  name: 'VMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  message: '',
  duration: 3000,
  showClose: false
})

const visible = ref(false)
const startTimer = () => {
  if (props.duration === 0) return
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

onMounted(() => {
  visible.value = true
  startTimer()
})
</script>
