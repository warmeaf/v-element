import { onMounted, onUnmounted, unref } from 'vue'
import type { Ref } from 'vue'

type ClickOutsideTarget = Ref<HTMLElement | null> | HTMLElement | undefined

const useClickOutside = (element: ClickOutsideTarget, callBack: () => void) => {
  const handle = (event: MouseEvent) => {
    if (element && !unref(element)?.contains(event.target as HTMLElement)) {
      callBack()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handle)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handle)
  })
}

export default useClickOutside
