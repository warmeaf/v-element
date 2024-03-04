<!--
 * @Author: warmleaf 1391040917@qq.com
 * @Date: 2024-03-04 21:19:21
 * @LastEditors: warmleaf 1391040917@qq.com
 * @LastEditTime: 2024-03-04 21:57:03
 * @FilePath: \v-element\docs\examples\Message\Type.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { createMessage } from '@/components/message/method'
import VButton from '@/components/button/Button.vue'
const open = (type) => {
  createMessage({ message: 'hello world', type })
}
</script>
<template>
  <div class="block basic">
    <v-button @click="open('success')"> Success </v-button>
    <v-button @click="open('info')"> Info </v-button>
    <v-button @click="open('warning')"> warning </v-button>
    <v-button @click="open('danger')"> Danger </v-button>
  </div>
</template>
