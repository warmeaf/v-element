import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import VTooltip from './Tooltip.vue'
// import { ref } from 'vue'

describe('Tooltip.vue', () => {
  // 注册一个回调函数，在当前上下文中的每个测试运行前调用
  // https://cn.vitest.dev/api/#beforeeach
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test('基本测试', () => {
    const template = `
    <v-tooltip content="hello">
      <button>test button</button>
    </v-tooltip>
    `

    const wrapper = mount({
      components: {
        [VTooltip.name]: VTooltip
      },
      template
    })

    const triggerArea = wrapper.find('.v-tooltip__trigger')
    // 触发层存在
    expect(triggerArea.exists()).toBe(true)
    expect(triggerArea.text()).toBe('test button')
    const popperArea = wrapper.find('.v-tooltip__popper')
    // 展示层不存在
    expect(popperArea.exists()).toBe(false)
  })

  test('点击触发', async () => {
    const template = `
    <button id="out">out</button>
    <v-tooltip content="hello" trigger="click">
      <button>test button</button>
    </v-tooltip>
    `

    const wrapper = mount({
      components: {
        [VTooltip.name]: VTooltip
      },
      template
    })

    // console.log(wrapper.html())
    // 移入触发层
    wrapper.get('.v-tooltip__trigger').trigger('click')
    await vi.runAllTimers()
    // 展示层存在
    expect(wrapper.find('.v-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.v-tooltip__popper').text()).toBe('hello')
    // console.log(wrapper.html())

    // 点击外面的元素
    wrapper.get('#out').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.vk-tooltip__popper').exists()).toBe(false)
  })

  test('移入移出触发层', async () => {
    const template = `
    <v-tooltip content="hello">
      <button>test button</button>
    </v-tooltip>
    `

    const wrapper = mount({
      components: {
        [VTooltip.name]: VTooltip
      },
      template
    })

    // 移入触发层
    wrapper.get('.v-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()
    // 展示层存在
    expect(wrapper.find('.v-tooltip__popper').exists()).toBe(true)
    expect(wrapper.find('.v-tooltip__popper').text()).toBe('hello')
    // console.log(wrapper.html())

    // 移出触发层
    wrapper.get('.v-tooltip').trigger('mouseleave')
    await vi.runAllTimers()
    expect(wrapper.find('.v-tooltip__popper').exists()).toBe(false)
  })
})
