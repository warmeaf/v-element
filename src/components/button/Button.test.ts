import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VIcon from '@/components/icon/Icon.vue'

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })

    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('v-button--primary')
    expect(wrapper.get('button').text()).toBe('button')

    // 测试事件
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()

    // 测试事件
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })

    // console.log(wrapper.html())
    // 寻找对应组件
    const iconHtml = wrapper.findComponent(FontAwesomeIcon)
    // console.log(iconHtml.html())
    // 判断是否存在
    expect(iconHtml.exists()).toBeTruthy()
    expect(iconHtml.attributes('icon')).toBe('arrow-up')
  })

  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['VIcon']
      }
    })

    console.log(wrapper.html())
    // 寻找对应组件
    const iconHtml = wrapper.findComponent(VIcon)
    expect(iconHtml.exists()).toBeTruthy()
    expect(iconHtml.attributes('icon')).toBe('spinner')
    expect(wrapper.classes()).toContain('is-disabled')
  })
})
