<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VButton from '@/components/button/Button.vue'

// 为什么这么写？参考：https://www.douyin.com/user/self?modal_id=7251216368719220023&showTab=favorite_collection
const buttonRef = ref<InstanceType<typeof VButton> | null>()
onMounted(() => {
  console.log(buttonRef.value)
  console.log(buttonRef.value?.ref)
})
</script>

<template>
  <h1 class="text-3xl font-bold underline bg-amber-500">按钮组件</h1>
  <p>
    <v-button size="large">test button </v-button>
    <v-button type="primary">test button </v-button>
    <v-button type="info">test button </v-button>
    <v-button type="warning">test button </v-button>
    <v-button type="danger">test button </v-button>
    <v-button ref="buttonRef" type="success">test button </v-button>
  </p>

  <p>
    <v-button plain round>test button </v-button>
    <v-button type="primary" plain round>test button </v-button>
    <v-button type="info" plain round>test button </v-button>
    <v-button type="warning" plain round>test button </v-button>
    <v-button type="danger" plain round>test button </v-button>
    <v-button ref="buttonRef" type="success" plain round>test button </v-button>
  </p>
</template>

<style scoped></style>
