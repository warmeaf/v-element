<template>
  <button
    ref="_ref"
    class="v-button"
    :class="{
      [`v-button--${type}`]: type,
      [`v-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled || loading
    }"
    :disabled="disabled"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <v-icon v-if="icon" :icon="icon" />
    <v-icon v-if="loading" icon="spinner" spin />
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VIcon from '../icon/Icon.vue'

defineOptions({
  name: 'VButton'
})

// 定义属性类型方式一
// import type { Props } from './props'
// withDefaults(defineProps<Props>(), {
//   nativeType: 'button'
// })

// 定义属性类型方式二
import { props } from './props'
defineProps(props)

const _ref = ref<HTMLButtonElement | null>(null)
defineExpose({
  ref: _ref
})
</script>
