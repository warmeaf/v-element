<template>
  <div class="v-collapse-item">
    <div
      class="v-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleItemClick"
    >
      <slot name="header">{{ title }}</slot>
      <v-icon icon="chevron-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div v-show="isActive" class="v-collapse-item__wrapper">
        <div class="v-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { collapseItemContextKey } from './types'
import type { CollapseItemProps } from './types'
import VIcon from '@/components/icon/Icon.vue'

defineOptions({
  name: 'VCollapseItem',
})

const props = defineProps<CollapseItemProps>()

const collapseItemContext = inject(collapseItemContextKey)
const isActive = computed(() =>
  collapseItemContext?.activeNames.value.includes(props.name),
)
const handleItemClick = () => {
  if (props.disabled) return
  collapseItemContext?.handleItemClick(props.name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  'before-enter': (el) => {
    el.style.height = '0px'
  },
  enter: (el) => {
    el.style.height = `${el.scrollHeight}px`
  },
  'after-enter': (el) => {
    el.style.height = 'revert'
  },
  'before-leave': (el) => {
    el.style.height = `${el.scrollHeight}px`
  },
  leave: (el) => {
    el.style.height = '0px'
  },
  'after-leave': (el) => {
    el.style.height = 'revert'
  },
}
</script>
