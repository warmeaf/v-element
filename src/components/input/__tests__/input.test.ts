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
})
