<template>
  <div
    class="v-input"
    :class="{
      [`v-input-${type}`]: type,
      [`v-input-${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix
    }"
  >
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="v-input__prepend">
        <slot name="prepend" />
      </div>
      <!-- input -->
      <div class="v-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="v-input__prefix">
          <slot name="prefix" />
        </span>
        <!-- input -->
        <input class="v-input__inner" :type="type" :disabled="disabled" />
        <!-- suffix slot -->
        <span v-if="$slots.suffix" class="v-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="v-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea class="v-textarea__wrapper" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { InputProps, InputEmits } from './types'

defineOptions({
  name: 'VInput'
})

withDefaults(defineProps<InputProps>(), {
  type: 'text'
})

defineEmits<InputEmits>()
</script>
