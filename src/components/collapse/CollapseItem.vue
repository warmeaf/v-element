<template>
  <div
    class="v-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div class="v-collapse-item__header">
      <slot name="header">{{ title }}</slot>
    </div>
    <div class="v-collapse-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { collapseItemProps } from './types.ts'

defineOptions({
  name: 'VCollapseItem'
})

defineProps(collapseItemProps)
</script>
