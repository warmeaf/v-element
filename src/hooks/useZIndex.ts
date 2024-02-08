import { ref, computed } from 'vue'

const zIndex = ref(0)
const INITIAL_Z_INDEX = 2000

const useZIndex = () => {
  const currentZIndex = computed(() => zIndex.value + INITIAL_Z_INDEX)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    nextZIndex
  }
}

export default useZIndex
