import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VCollapse from './Collapse.vue'
import VCollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('collapse basice', async () => {
    const onChange = vi.fn()
    const wrapper = mount(
      () => (
        <VCollapse modelValue={['a']} onChange={onChange}>
          <VCollapseItem title="标题a" name="a">
            内容a
          </VCollapseItem>
          <VCollapseItem title="标题b" name="b">
            内容b
          </VCollapseItem>
          <VCollapseItem title="标题c" name="c" disabled>
            内容c
          </VCollapseItem>
        </VCollapse>
      ),
      {
        global: {
          stubs: ['VIcon']
        },
        attachTo: document.body
      }
    )

    console.log(wrapper.html())
    const headers = wrapper.findAll('.v-collapse-item__header')
    const contents = wrapper.findAll('.v-collapse-item__wrapper')
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 文本
    expect(headers[0].text()).toBe('标题a')
    expect(contents[0].text()).toBe('内容a')

    // 可见性
    expect(contents[0].isVisible()).toBeTruthy()
    expect(contents[1].isVisible()).toBeFalsy()
    expect(contents[2].isVisible()).toBeFalsy()

    // 行为
    await headers[0].trigger('click')
    console.log(contents[0].html())
    expect(contents[0].isVisible()).toBeFalsy()
    expect(onChange).toBeCalledWith([])
    await headers[1].trigger('click')
    expect(contents[1].isVisible()).toBeTruthy()
    expect(onChange).toBeCalledWith(['b'])

    // disabled
    expect(headers[2].classes()).toContain('is-disabled')
    await headers[2].trigger('click')
    expect(contents[2].isVisible()).toBeFalsy()
  })
})
