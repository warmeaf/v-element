<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VButton from '@/components/button/Button.vue'
import VCollapse from '@/components/collapse/Collapse.vue'
import VCollapseItem from '@/components/collapse/CollapseItem.vue'
import VIcon from '@/components/icon/Icon.vue'
import VTooltip from '@/components/tooltip/Tooltip.vue'
import VMessage from '@/components/message/Message.vue'

// 为什么这么写？参考：https://www.douyin.com/user/self?modal_id=7251216368719220023&showTab=favorite_collection
const buttonRef = ref<InstanceType<typeof VButton> | null>()
onMounted(() => {
  // console.log(buttonRef.value)
  // console.log(buttonRef.value?.ref)
})

const activeNames = ref(['02'])
// setTimeout(() => {
//   activeNames.value = ['01', '02']
// }, 2000)
const handleCollapseChange = (value: (string | number)[]) => {
  console.log(value)
}

const icon = ref('fa-spinner')

import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
const triggerNode = ref<InstanceType<typeof VButton> | null>()
const overlayNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
const trigger = ref<'hover' | 'click'>('hover')
onMounted(() => {
  if (triggerNode.value?.ref && overlayNode.value) {
    popperInstance = createPopper(triggerNode.value.ref, overlayNode.value, {
      placement: 'right'
    })
  }
})
setTimeout(() => {
  popperInstance?.setOptions({
    placement: 'top'
  })
  trigger.value = 'click'
}, 2000)
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
    <v-collapse v-model="activeNames" accordion @change="handleCollapseChange">
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
  <br />
  <div class="inline-flex items-center"><v-icon :icon="icon" color="green"></v-icon>你好</div>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">提示组件</div>
  <div class="p-4">
    <v-button ref="triggerNode" type="primary">test button</v-button>
    <div ref="overlayNode">hello</div>
    <v-tooltip content="hello" :trigger="trigger" placement="right">
      <v-button type="primary">button</v-button>
    </v-tooltip>
  </div>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">message组件</div>
  <v-message message="hello" :duration="0" show-close></v-message>
</template>

<style scoped></style>
