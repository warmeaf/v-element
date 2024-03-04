<script setup>
import { h } from 'vue'
import { createMessage } from '@/components/message/method'
import VButton from '@/components/button/Button.vue'
const open = () => {
  createMessage({ message: 'hello world' })
}
const open2 = () => {
  createMessage({ message: h('b', 'this is bold') })
}
</script>
<template>
  <div class="block basic">
    <v-button type="primary" @click="open"> 创建一条消息 </v-button>
    <v-button @click="open2"> 创建支持 VNode 的消息 </v-button>
  </div>
</template>
