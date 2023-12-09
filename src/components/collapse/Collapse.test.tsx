import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VCollapse from './Collapse.vue'
import VCollapseItem from './CollapseItem.vue'
import { ref } from 'vue'

describe('Collapse.vue', () => {
  test('样式', async () => {
    const template = `
     <v-collapse v-model="value">
      <v-collapse-item title="testa" name="a">testa</v-collapse-item>
      <v-collapse-item title="testb" name="b">testb</v-collapse-item>
     </v-collapse>
    `
    const wrapper = mount(
      {
        components: {
          [VCollapse.name]: VCollapse,
          [VCollapseItem.name]: VCollapseItem
        },
        data() {
          return {
            value: ['a']
          }
        },
        template
      },
      {
        global: {
          stubs: ['VIcon']
        },
        attachTo: document.body
      }
    )

    // console.log(wrapper.html())
    const headers = wrapper.findAll('.v-collapse-item__header')
    expect(headers.length).toBe(2)
    expect(headers[0].classes()).toContain('is-active')
    expect(headers[1].classes()).not.toContain('is-active')
    // await wrapper.find('.v-collapse-item__header').trigger('click')
    // expect(wrapper.vm.value).toEqual([''])
    // await wrapper.find('.v-collapse-item__header').trigger('click')
    // expect(wrapper.vm.value).toEqual(['a'])
  })

  test('行为', async () => {
    const value = ref(['a'])

    const template = `
     <v-collapse v-model="value">
      <v-collapse-item title="testa" name="a">testa</v-collapse-item>
      <v-collapse-item title="testb" name="b">testb</v-collapse-item>
     </v-collapse>
    `
    const wrapper = mount(
      {
        components: {
          [VCollapse.name]: VCollapse,
          [VCollapseItem.name]: VCollapseItem
        },
        template,
        setup() {
          return {
            value
          }
        }
      },
      {
        global: {
          stubs: ['VIcon']
        },
        attachTo: document.body
      }
    )

    const headers = wrapper.findAll('.v-collapse-item__header')
    await headers[0].trigger('click')
    expect(wrapper.vm.value).toEqual([])
    await headers[0].trigger('click')
    await headers[1].trigger('click')
    expect(wrapper.vm.value).toEqual(['a', 'b'])
  })
})
