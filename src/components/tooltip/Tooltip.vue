<template>
  <div class="v-tooltip">
    <div ref="triggerNode" class="v-tooltip__trigger" v-on="events">
      <slot></slot>
    </div>
    <div v-if="isOpen" ref="popperNode" class="v-tooltip__popper">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import type { TooltipProps, TooltipEmits } from './types'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'

defineOptions({
  name: 'VTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  trigger: 'hover'
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null
const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const events: Record<string, Function> = reactive({})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    events['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
attachEvents()

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement
        })
      }
    } else {
      popperInstance?.destroy()
    }
  },
  {
    flush: 'post'
  }
)
</script>
