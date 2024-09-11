import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VInput from '../src/Input.vue'
import { ref, nextTick } from 'vue'

describe('Input 组件', () => {
  test('基本展示-针对动态 class', () => {
    // 针对动态 class，查看 classes 是否正确

    const template = `
      <v-input :size="size" :disabled="disabled">
        <template #prepend>
          <span>prepend</span>
        </template>
        <template #append>
          <span>append</span>
        </template>
        <template #prefix>
          <span>prefix</span>
        </template>
        <template #suffix>
          <span>suffix</span>
        </template>
      </v-input>
    `
    const wrapper = mount({
      components: {
        VInput
      },
      template,
      data() {
        return {
          size: 'large',
          disabled: true
        }
      }
    })

    expect(wrapper.find('.v-input').classes()).toContain('v-input-text')
    expect(wrapper.find('.v-input').classes()).toContain('v-input-large')
    expect(wrapper.find('.v-input').classes()).toContain('is-disabled')
    expect(wrapper.find('.v-input').classes()).toContain('is-prepend')
    expect(wrapper.find('.v-input').classes()).toContain('is-append')
    expect(wrapper.find('.v-input').classes()).toContain('is-prefix')
    expect(wrapper.find('.v-input').classes()).toContain('is-suffix')
  })

  test('基本展示-针对 V-if 和 slots', () => {
    // 针对 V-if 是否渲染正确的标签以及内容
    // 针对 slots，是否渲染对应的 slots 内容

    const template = `
      <div class="v-input-01">
        <v-input :type="type01" />
      </div>
      <div class="v-input-02">
        <v-input :type="type02">
          <template #prepend>
            <span>prepend</span>
          </template>
          <template #append>
            <span>append</span>
          </template>
          <template #prefix>
            <span>prefix</span>
          </template>
          <template #suffix>
            <span>suffix</span>
          </template>
       </v-input>
      </div>
    `
    const wrapper = mount({
      components: {
        VInput
      },
      template,
      data() {
        return {
          type01: 'textarea',
          type02: 'input'
        }
      }
    })

    expect(
      wrapper.find('.v-input-01').find('.v-textarea__wrapper').exists()
    ).toBe(true)

    // prepend slot
    expect(wrapper.find('.v-input-02').find('.v-input__prepend').exists()).toBe(
      true
    )
    expect(wrapper.find('.v-input-02').find('.v-input__prepend').text()).toBe(
      'prepend'
    )

    // append slot
    expect(wrapper.find('.v-input-02').find('.v-input__append').exists()).toBe(
      true
    )
    expect(wrapper.find('.v-input-02').find('.v-input__append').text()).toBe(
      'append'
    )

    // prefix slot
    expect(wrapper.find('.v-input-02').find('.v-input__prefix').exists()).toBe(
      true
    )
    expect(wrapper.find('.v-input-02').find('.v-input__prefix').text()).toBe(
      'prefix'
    )

    // suffix slot
    expect(wrapper.find('.v-input-02').find('.v-input__suffix').exists()).toBe(
      true
    )
    expect(wrapper.find('.v-input-02').find('.v-input__suffix').text()).toBe(
      'suffix'
    )
  })

  test('支持 v-model', async () => {
    const value = ref('')
    const template = `
      <v-input ref="input" v-model="value" />
    `
    const wrapper = mount({
      components: {
        VInput
      },
      template,
      setup() {
        return {
          value
        }
      }
    })

    value.value = '123'
    await nextTick()
    expect(wrapper.findComponent(VInput).props('modelValue')).toBe('123')
    expect(wrapper.get('input').element.value).toBe('123')

    // setValue 模拟输入
    await wrapper.get('input').setValue('456')
    expect(value.value).toBe('456')
    expect(wrapper.findComponent(VInput).props('modelValue')).toBe('456')
  })

  // 支持 clearable，
  // 设置 clearable 为 true
  // 当输入框有值，且鼠标移入输入框或聚焦输入框时，显示清除图标
  // 当输入框有值，且点击清除图标时，清空输入框的值
  // 当输入框有值，且输入框聚焦，鼠标移出仍然显示清除图标
  test('支持 clearable', async () => {
    const value = ref('')
    const template = `
      <v-input v-model="value" clearable />
    `
    const wrapper = mount(
      {
        components: {
          VInput
        },
        template,
        setup() {
          return { value }
        }
      },
      {
        global: {
          stubs: ['VIcon']
        }
      }
    )

    // 初始状态下不应显示清除图标
    expect(wrapper.find('.v-input__clear').exists()).toBe(false)
    // 输入框输入，显示清除图标
    await wrapper.get('input').setValue('456')
    await wrapper.find('input').trigger('focus')
    expect(wrapper.find('.v-input__clear').exists()).toBe(true)
    // 点击清除图标清空值
    await wrapper.find('.v-input__clear').trigger('click')
    expect(wrapper.get('input').element.value).toBe('')
    // 当输入框有值，输入框失去焦点，鼠标进入显示清除图标
    await wrapper.get('input').setValue('456')
    await wrapper.find('input').trigger('blur')
    await wrapper.find('.v-input').trigger('mouseenter')
    expect(wrapper.find('.v-input__clear').exists()).toBe(true)
    // 当输入框有值，输入框失去焦点，鼠标移出输入框，不显示清除图标
    await wrapper.find('.v-input').trigger('mouseleave')
    expect(wrapper.find('.v-input__clear').exists()).toBe(false)
  })

  // 可切换显示隐藏的密码框
  // 设置 type 为 password
  // 设置 show-password 为 true
  // 输入框有值，默认显示隐藏图标
  // 当点击显示隐藏图标时，切换 type 为 text 或 password
  test('支持 password', async () => {
    const value = ref('')
    const template = `
      <v-input v-model="value" type="password" show-password/>
    `
    const wrapper = mount(
      {
        components: {
          VInput
        },
        template,
        setup() {
          return { value }
        }
      },
      {
        global: {
          stubs: ['VIcon']
        }
      }
    )

    // 初始状态下 type 为 password
    expect(wrapper.find('input').attributes('type')).toBe('password')
    // 输入框没值，不显示隐藏图标
    expect(wrapper.find('.v-input__show-password').exists()).toBe(false)
    // 输入框有值，默认显示隐藏图标
    await wrapper.get('input').setValue('23214')
    expect(wrapper.find('.v-input__show-password').exists()).toBe(true)
    // 点击显示隐藏图标，切换 type 为 text
    await wrapper.find('.v-input__show-password').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
    // 再次点击显示隐藏图标，切换 type 为 password
    await wrapper.find('.v-input__show-password').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })
})
