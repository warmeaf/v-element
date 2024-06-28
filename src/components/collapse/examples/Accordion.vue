<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import VCollapse from '@/components/collapse/Collapse.vue'
import VCollapseItem from '@/components/collapse/CollapseItem.vue'
const openedValue = ref('a')
</script>
<template>
  <div class="block basic">
    <v-collapse v-model="openedValue" accordion>
      <v-collapse-item name="a" title="Title A">
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </v-collapse-item>
      <v-collapse-item name="b" title="Title B">
        <div>this is bbbbb test</div>
      </v-collapse-item>
      <v-collapse-item name="c" title="Title C">
        <div>this is cccc test</div>
      </v-collapse-item>
    </v-collapse>
  </div>
</template>
