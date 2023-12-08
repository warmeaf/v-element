import { describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('collapse basice', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a']
      },
      slots: {
        default: () => (
          <CollapseItem name="a" title="aaa">
            你好
          </CollapseItem>
        )
      },
      global: {
        stubs: ['VIcon']
      }
    })

    console.log(wrapper.html())
  })
})
