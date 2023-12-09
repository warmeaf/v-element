import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VCollapse from './Collapse.vue'
import VCollapseItem from './CollapseItem.vue'
import { ref } from 'vue'

describe('Collapse.vue', () => {
  test('collapse basice', async () => {
    const value = ref(['a'])

    const template = `
     <v-collapse v-model="value" accordion>
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
        // data() {
        //   return {
        //     value: ['a']
        //   }
        // },
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

    console.log(wrapper.html())
    await wrapper.find('.v-collapse-item__header').trigger('click')
    expect(wrapper.vm.value).toEqual([''])
  })
})
