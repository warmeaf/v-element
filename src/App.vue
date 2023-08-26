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
  <v-button ref="buttonRef" round type="primary">test button </v-button>
</template>

<style scoped></style>
