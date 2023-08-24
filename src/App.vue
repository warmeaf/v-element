<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VButton from '@/components/button/Button.vue'

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
