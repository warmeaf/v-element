<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VButton from '@/components/button/Button.vue'
import VCollapse from '@/components/collapse/Collapse.vue'
import VCollapseItem from '@/components/collapse/CollapseItem.vue'
import VIcon from '@/components/icon/Icon.vue'

// 为什么这么写？参考：https://www.douyin.com/user/self?modal_id=7251216368719220023&showTab=favorite_collection
const buttonRef = ref<InstanceType<typeof VButton> | null>()
onMounted(() => {
  // console.log(buttonRef.value)
  // console.log(buttonRef.value?.ref)
})

const activeNames = ref(['02'])
// const handleCollapseChange = (value: string[]) => {
//   console.log(value)
// }

const icon = ref('fa-spinner')
</script>

<template>
  <div class="mt-4 text-3xl font-bold underline bg-amber-500">按钮组件</div>
  <p>
    <v-button size="large" icon="volume-high">test button </v-button>
    <v-button type="primary">test button </v-button>
    <v-button type="info">test button </v-button>
    <v-button type="warning" loading>test button </v-button>
    <v-button type="danger">test button </v-button>
    <v-button ref="buttonRef" type="success">test button </v-button>
  </p>

  <p>
    <v-button plain round>test button </v-button>
    <v-button type="primary" plain round icon="arrow-up">test button </v-button>
    <v-button type="info" plain round>test button </v-button>
    <v-button type="warning" plain round>test button </v-button>
    <v-button type="danger" plain round>test button </v-button>
    <v-button ref="buttonRef" type="success" plain round>test button </v-button>
  </p>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">折叠组件</div>
  <p>
    <v-collapse v-model="activeNames" accordion>
      <v-collapse-item name="01" title="test">
        <template #header> 标题1 </template>
        <div>折叠内容01</div>
      </v-collapse-item>
      <v-collapse-item name="02" title="标题2">折叠内容02</v-collapse-item>
      <v-collapse-item name="03" title="标题3" disabled>折叠内容03</v-collapse-item>
    </v-collapse>
    {{ activeNames }}
  </p>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">图标组件</div>
  <v-icon :icon="icon" type="primary" size="2xl"></v-icon>
  <div><v-icon :icon="icon" color="green"></v-icon>你好</div>
</template>

<style scoped></style>
