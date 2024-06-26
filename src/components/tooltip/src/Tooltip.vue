<template>
  <div ref="popperWrapperNode" class="v-tooltip" v-on="outerEvents">
    <div ref="triggerNode" class="v-tooltip__trigger" v-on="events">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" ref="popperNode" class="v-tooltip__popper">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onUnmounted } from 'vue'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'VTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  trigger: 'hover',
  manual: false,
  transition: 'fade',
  openDelay: 0,
  closeDelay: 200,
  offset: 8
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
const popperWrapperNode = ref<HTMLElement | null>(null)
let popperInstance: Instance | null = null

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const events = reactive<{
  click?: () => void
}>({})
const outerEvents = reactive<{
  mouseenter?: () => void
  mouseleave?: () => void
}>({})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    outerEvents['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}

// 实现外侧点击
useClickOutside(popperWrapperNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})

watch(
  () => props.manual,
  (newValue) => {
    if (newValue) {
      delete events['click']
      delete outerEvents['mouseenter']
      delete outerEvents['mouseleave']
    } else {
      // 卸载旧的事件
      delete events['click']
      delete outerEvents['mouseenter']
      delete outerEvents['mouseleave']
      attachEvents()
    }
  }
)

// 根据 trigger 的值动态绑定事件
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      // 卸载旧的事件
      delete events['click']
      delete outerEvents['mouseenter']
      delete outerEvents['mouseleave']
      attachEvents()
    }
  }
)

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, props.offset]
              }
            }
          ]
        })
      }
    } else {
      popperInstance = null
    }
  },
  {
    flush: 'post'
  }
)

onUnmounted(() => {
  popperInstance?.destroy()
})

// 对外暴露
defineExpose<TooltipInstance>({
  open: openFinal,
  close: closeFinal
})
</script>
