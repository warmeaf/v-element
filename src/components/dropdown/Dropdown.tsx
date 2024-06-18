import { defineComponent, ref, Fragment } from 'vue'
import type { PropType } from 'vue'
import type { Placement } from '@popperjs/core'
import VTooltip from '@/components/tooltip/Tooltip.vue'
import type { MenuOption } from './types'
import RenderVnode from '@/components/common/RenderVnode'

export default defineComponent({
  name: 'VDropdown',
  props: {
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      default: () => []
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top'
    },
    manual: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 200
    },
    offset: {
      type: Number,
      default: 8
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ['visible-change', 'select'],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<InstanceType<typeof VTooltip> | null>(null)

    const visibleChange = (value: boolean) => {
      emit('visible-change', value)
    }
    const select = (value: MenuOption) => {
      if (value.disabled) return
      emit('select', value)
      if (props.hideAfterClick) {
        tooltipRef.value?.close()
      }
    }

    expose({
      show: () => tooltipRef.value?.open(),
      hide: () => tooltipRef.value?.close()
    })

    return () => {
      // 这里可以写模板
      return (
        <div class="v-dropdown">
          <VTooltip
            ref={tooltipRef}
            placement={props.placement}
            trigger={props.trigger}
            manual={props.manual}
            transition={props.transition}
            openDelay={props.openDelay}
            closeDelay={props.closeDelay}
            offset={props.offset}
            onVisible-change={visibleChange}
          >
            {{
              default: () => slots.default && slots.default(),
              content: () => (
                <ul class="v-dropdown__menu">
                  {props.menuOptions.map((item) => {
                    return (
                      <Fragment key={item.key}>
                        {item.divided ? <li role="separator" class="divided-placeholder" /> : ''}
                        <li
                          class={{
                            'v-dropdown__item': true,
                            'is-disabled': item.disabled,
                            'is-divided': item.disabled
                          }}
                          id={`dropdown-item-${item.key}`}
                          onClick={() => select(item)}
                        >
                          <RenderVnode vnode={item.label} />
                        </li>
                      </Fragment>
                    )
                  })}
                </ul>
              )
            }}
          </VTooltip>
        </div>
      )
    }
  }
})
