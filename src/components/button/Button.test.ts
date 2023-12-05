import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

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
})
