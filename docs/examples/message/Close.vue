<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { createMessage } from '@/components/message/src/method'
import VButton from '@/components/button/src/Button.vue'
const open = () => {
  createMessage({ message: 'hello world', showClose: true, duration: 0 })
}
</script>
<template>
  <div class="block basic">
    <v-button @click="open">可关闭消息</v-button>
  </div>
</template>
