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
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
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
        <input
          class="v-input__inner"
          :type="type"
          :disabled="disabled"
          :value="innerValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span v-if="showClearIcon" class="v-input__clear" @click="clearInput">
          <v-icon icon="circle-xmark" />
        </span>
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
      <textarea class="v-textarea__wrapper" :value="modelValue" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { InputProps, InputEmits } from './types'
import VIcon from '@/components/icon/src/Icon.vue'

defineOptions({
  name: 'VInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const innerValue = computed(() => props.modelValue)
const showClearIcon = computed(() => {
  return (
    props.clearable && !!innerValue.value && (isFocused.value || hovering.value)
  )
})
const isFocused = ref(false)
// 输入框是否处于 hover 状态
const hovering = ref(false)

const emits = defineEmits<InputEmits>()
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits('update:modelValue', target.value)
}

const handleMouseEnter = () => {
  hovering.value = true
}
const handleMouseLeave = () => {
  hovering.value = false
}
const handleFocus = () => {
  isFocused.value = true
}
const handleBlur = () => {
  isFocused.value = false
}
const clearInput = () => {
  emits('update:modelValue', '')
}
</script>

<style>
.v-input {
  display: inline-flex;
  position: relative;
}
</style>
