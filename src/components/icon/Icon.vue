<template>
  <i
    class="v-icon"
    :class="{
      [`v-icon--${type}`]: type,
    }"
    :style="{
      color: color,
    }"
  >
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<IconProps>()
// console.log(props)

const filteredProps = computed(() => omit(props, ['type', 'color']))
// console.log(filteredProps)

defineOptions({
  name: 'VIcon',
})
</script>
