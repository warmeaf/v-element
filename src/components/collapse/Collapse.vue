<template>
  <div class="v-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseItemContextKey } from './types'

defineOptions({
  name: 'VCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => {
    activeNames.value = val
  }
)

const handleItemClick = (item: NameType): void => {
  const index = activeNames.value.indexOf(item)
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push(item)
  }

  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
provide(collapseItemContextKey, {
  activeNames,
  handleItemClick
})
</script>
