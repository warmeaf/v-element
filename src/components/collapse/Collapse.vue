<template>
  <div class="v-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'
// import { provide, ref, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseItemContextKey } from './types'

defineOptions({
  name: 'VCollapse',
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

// 写法1
// const activeNames = ref<NameType[]>(props.modelValue)
// watch(
//   () => props.modelValue,
//   (val) => {
//     activeNames.value = val
//   }
// )

// 写法2
const activeNames = computed(() => props.modelValue)

if (props.accordion && props.modelValue.length > 1) {
  console.warn('accordion 模式只能有一个激活状态的数据')
}
const handleItemClick = (item: NameType): void => {
  const _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames[0] = _activeNames[0] === item ? '' : item
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(item)
    }
  }

  // // 之前的写法，事件参数是一个响应式对象
  // emits('update:modelValue', activeNames.value)
  // emits('change', activeNames.value)
  // 更改后的写法
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}
provide(collapseItemContextKey, {
  activeNames,
  handleItemClick,
})
</script>
