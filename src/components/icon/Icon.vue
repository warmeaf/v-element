<template>
  <i class="v-icon" v-bind="$attrs">
    <font-awesome-icon v-bind="$props" />
  </i>
</template>

<script setup lang="ts">
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<IconProps>()
// console.log(props.icon)
defineOptions({
  name: 'VIcon',
  inheritAttrs: false
})
</script>
