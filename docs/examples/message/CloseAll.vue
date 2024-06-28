<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { createMessage, closeAll } from '@/components/message/src/method'
import VButton from '@/components/button/src/Button.vue'
const open = () => {
  createMessage({ message: 'hello world1', duration: 0 })
  createMessage({ message: 'hello world2', duration: 0 })
  createMessage({ message: 'hello world3', duration: 0 })
}
const close = () => {
  closeAll()
}
</script>
<template>
  <div class="block basic">
    <v-button @click="open">创建三条消息</v-button>
    <v-button @click="close">全部关闭</v-button>
  </div>
</template>
