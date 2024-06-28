<template>
  <div class="v-dropdown">
    <v-tooltip
      ref="tooltipRef"
      :placement="placement"
      :trigger="trigger"
      :manual="manual"
      :transition="transition"
      :openDelay="openDelay"
      :closeDelay="closeDelay"
      :offset="offset"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul class="v-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            ></li>
            <li
              class="v-dropdown__item"
              @click="select(item)"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.disabled
              }"
              :id="`dropdown-item-${item.key}`"
            >
              <render-vnode :vnode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {
  DropdownProps,
  DropdownEmits,
  MenuOption,
  DropdownInstance
} from './types'
import VTooltip from '@/components/tooltip/Tooltip.vue'
import RenderVnode from '@/components/common/RenderVnode'

// 定义选项、属性、事件
defineOptions({
  name: 'VDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()

// 事件
const visibleChange = (visible: boolean) => {
  emits('visible-change', visible)
}
const select = (value: MenuOption) => {
  if (value.disabled) return
  emits('select', value)
  if (props.hideAfterClick) {
    tooltipRef.value && tooltipRef.value.close()
  }
}

// 对外暴露
const tooltipRef = ref<InstanceType<typeof VTooltip> | null>(null)
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value && tooltipRef.value.open(),
  hide: () => tooltipRef.value && tooltipRef.value.close()
})
</script>
