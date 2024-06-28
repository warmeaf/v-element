<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { createMessage } from '@/components/message/src/method'
import VButton from '@/components/button/src/Button.vue'
const open = (type) => {
  createMessage({ message: 'hello world', type })
}
</script>
<template>
  <div class="block basic">
    <v-button @click="open('success')">Success</v-button>
    <v-button @click="open('info')">Info</v-button>
    <v-button @click="open('warning')">warning</v-button>
    <v-button @click="open('danger')">Danger</v-button>
  </div>
</template>
