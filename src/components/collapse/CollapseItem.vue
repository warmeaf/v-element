<template>
  <div
    class="v-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div class="v-collapse-item__header" @click="handleItemClick(props.name)">
      <slot name="header">{{ title }}</slot>
    </div>
    <div v-show="isActive" class="v-collapse-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import { collapseItemProps } from './types.ts'

defineOptions({
  name: 'VCollapseItem'
})

const props = defineProps(collapseItemProps)

const { activeNames, handleItemClick } = inject('collapseItemContextKey')
const isActive = computed(() => activeNames.value.includes(props.name))
</script>
