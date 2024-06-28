<script setup lang="ts">
import { ref, onMounted, h, computed } from 'vue'
import VButton from '@/components/button/src/Button.vue'
import VCollapse from '@/components/collapse/src/Collapse.vue'
import VCollapseItem from '@/components/collapse/src/CollapseItem.vue'
import VIcon from '@/components/icon/src/Icon.vue'
import VTooltip from '@/components/tooltip/src/Tooltip.vue'
// import VDropdown from '@/components/dropdown/Dropdown.vue'
import VDropdown from '@/components/dropdown/src/Dropdown'
import type { MenuOption } from '@/components/dropdown/src/types'
// import VMessage from '@/components/message/Message.vue'
import { createMessage } from '@/components/message/src/method'

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

const trigger = ref<'hover' | 'click'>('hover')
onMounted(() => {
  createMessage({
    message: h('span', null, 'hello hello hello'),
    duration: 0,
    showClose: true
  })
  const instance = createMessage({
    type: 'success',
    message: 'hello',
    duration: 0,
    showClose: true
  })
  createMessage({
    message: 'hello hello hello',
    duration: 0
  })
  createMessage({
    message: 'hello hello hello',
    duration: 0
  })

  setTimeout(() => {
    trigger.value = 'click'

    instance.destory()
  }, 2000)
})

// 响应式数据结合计算属性代码示例
const testData = ref(0)
const testFn = () => {
  console.log('run test')
  const value = testData.value
  return value
}
const test = computed(() => testFn())
console.log(test.value, 'test')
setTimeout(() => {
  testData.value = 10
  console.log(test.value, 'test')
}, 3000)
// 依次打印如下内容：
// run test
// 0 'test'
// run test
// 10 'test'

const tooltipRef = ref<InstanceType<typeof VTooltip> | null>(null)
const openTooltip = () => {
  tooltipRef.value?.open()
}
const closeTooltip = () => {
  tooltipRef.value?.close()
}

const menuOptions = ref<MenuOption[]>([
  {
    label: '选项1',
    key: '1'
  },
  {
    label: '选项2',
    key: '2',
    disabled: true
  },
  {
    label: h('span', null, 'hello hello hello'),
    key: '3',
    divided: true
  }
])
</script>

<template>
  <div class="mt-4 text-3xl font-bold underline bg-amber-500">按钮组件</div>
  <p>
    <v-button size="large" icon="volume-high" @click="openTooltip">
      test button
    </v-button>
    <v-button type="primary" @click="closeTooltip">test button</v-button>
    <v-button type="info">test button</v-button>
    <v-button type="warning" loading>test button</v-button>
    <v-button type="danger">test button</v-button>
    <v-button ref="buttonRef" type="success">test button</v-button>
  </p>

  <p>
    <v-button plain round>test button</v-button>
    <v-button type="primary" plain round icon="arrow-up">test button</v-button>
    <v-button type="info" plain round>test button</v-button>
    <v-button type="warning" plain round>test button</v-button>
    <v-button type="danger" plain round>test button</v-button>
    <v-button ref="buttonRef" type="success" plain round>test button</v-button>
  </p>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">折叠组件</div>
  <p>
    <v-collapse v-model="activeNames" accordion @change="handleCollapseChange">
      <v-collapse-item name="01" title="test">
        <template #header>标题1</template>
        <div>折叠内容01</div>
      </v-collapse-item>
      <v-collapse-item name="02" title="标题2">折叠内容02</v-collapse-item>
      <v-collapse-item name="03" title="标题3" disabled>
        折叠内容03
      </v-collapse-item>
    </v-collapse>
    {{ activeNames }}
  </p>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">图标组件</div>
  <v-icon :icon="icon" type="primary" size="2xl"></v-icon>
  <br />
  <div class="inline-flex items-center">
    <v-icon :icon="icon" color="green"></v-icon>
    你好
  </div>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">提示组件</div>
  <div class="p-4">
    <v-tooltip ref="tooltipRef" content="hello" manual>
      <v-button type="primary">test button</v-button>
    </v-tooltip>
    <v-tooltip
      content="hello"
      placement="right"
      :open-delay="1000"
      :close-delay="1000"
    >
      <v-button type="primary">button</v-button>
    </v-tooltip>
  </div>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">
    Dropdown 组件
  </div>
  <div class="p-4">
    <v-dropdown ref="dropdownRef" :menu-options="menuOptions">
      <v-button type="primary">test button</v-button>
    </v-dropdown>
  </div>

  <div class="mt-4 text-3xl font-bold underline bg-amber-500">message组件</div>
  <!-- <v-message message="hello" :duration="0" show-close></v-message> -->
</template>

<style scoped></style>
