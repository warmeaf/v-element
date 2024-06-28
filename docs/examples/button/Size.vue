<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Button from '@/components/button/src/Button.vue'
</script>
<template>
  <div class="block size">
    <Button size="large">Large</Button>
    <Button type="primary">普通</Button>
    <Button type="success" size="small">Small</Button>
  </div>
</template>
