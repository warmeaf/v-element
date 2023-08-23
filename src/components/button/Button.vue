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
  >
    <span><slot></slot></span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'VButton'
}
</script>
<script setup lang="ts">
// import type { Props } from './props'
// defineProps<Props>()
import { props } from './props'
defineProps(props)
</script>

<style scoped></style>
