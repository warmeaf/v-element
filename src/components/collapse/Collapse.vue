<template>
  <div class="v-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseItemContextKey } from './types'

defineOptions({
  name: 'VCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

// 写法1
const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  (val) => {
    activeNames.value = val
  }
)

// 写法2（这是错误写法）
// const activeNames = computed(() => props.modelValue)

if (props.accordion && props.modelValue.length > 1) {
  console.warn('accordion 模式只能有一个激活状态的数据')
}
const handleItemClick = (item: NameType): void => {
  if (props.accordion) {
    activeNames.value[0] = activeNames.value[0] === item ? '' : item
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(item)
    }
  }

  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
provide(collapseItemContextKey, {
  activeNames,
  handleItemClick
})
</script>
