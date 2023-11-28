<template>
  <div
    class="v-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div class="v-collapse-item__header" @click="handleItemClick">
      <slot name="header">{{ title }}</slot>
    </div>
    <div v-show="isActive" class="v-collapse-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { collapseItemProps, collapseItemContextKey } from './types'

defineOptions({
  name: 'VCollapseItem'
})

const props = defineProps(collapseItemProps)

const collapseItemContext = inject(collapseItemContextKey)
const isActive = computed(() => collapseItemContext?.activeNames.value.includes(props.name))
const handleItemClick = () => {
  if (props.disabled) return
  collapseItemContext?.handleItemClick(props.name)
}
</script>
