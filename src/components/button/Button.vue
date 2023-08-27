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
      'is-disabled': disabled
    }"
    :disabled="disabled"
    :type="nativeType"
    :autofocus="autofocus"
  >
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
// import type { Props } from './props'
// defineProps<Props>()
import { ref } from 'vue'

defineOptions({
  name: 'VButton'
})

import { props } from './props'
defineProps(props)

const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>

<style scoped>
.v-button {
  background-color: var(--v-color-primary);
}
</style>
