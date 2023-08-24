<template>
  <button
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

defineOptions({
  name: 'VButton'
})

import { props } from './props'
defineProps(props)
</script>

<style scoped></style>
