<script setup>
import Button from '@/components/button/Button.vue'
import Icon from '@/components/icon/Icon.vue'
</script>
<template>
<div class="block basic">
  <Button> hello </Button>
  <Button type="primary"> Primary </Button>
  <Button type="success"> Success </Button>
  <Button type="warning"> Warning </Button>
  <Button type="danger"> Danger </Button>
  <Button type="info"> Info </Button>
</div>

<div class="block plain">
  <Button plain> hello </Button>
  <Button type="primary" plain> Primary </Button>
  <Button type="success" plain> Success </Button>
  <Button type="warning" plain> Warning </Button>
  <Button type="danger" plain> Danger </Button>
  <Button type="info" plain> Info </Button>
</div>

<div class="block round">
  <Button round> hello </Button>
  <Button type="primary" round> Primary </Button>
  <Button type="success" round> Success </Button>
  <Button type="warning" round> Warning </Button>
  <Button type="danger" round> Danger </Button>
  <Button type="info" round> Info </Button>
</div>

<div class="block circle">
  <Button circle> <Icon icon="star" /> </Button>
  <Button type="primary" circle>   <Icon icon="star" /> </Button>
  <Button type="success" circle> <Icon icon="star" /> </Button>
  <Button type="warning" circle> <Icon icon="star" /> </Button>
  <Button type="danger" circle> <Icon icon="star" /> </Button>
  <Button type="info" circle> <Icon icon="star" /> </Button>
</div>
</template>
<style>
.block {
  margin-bottom: 10px;
}
</style>