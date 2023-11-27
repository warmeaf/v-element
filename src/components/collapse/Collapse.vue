<template>
  <div class="v-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import type { NameType } from './types.ts'

defineOptions({
  name: 'VCollapse'
})

const activeNames = ref<NameType[]>([])
const handleItemClick = (item: NameType): volid => {
  const index = activeNames.value.indexOf(item)
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push(item)
  }
}
provide('collapseItemContextKey', {
  activeNames,
  handleItemClick
})
</script>
