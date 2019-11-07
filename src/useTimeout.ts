import { ref, Ref, onUnmounted, getCurrentInstance } from '@vue/runtime-dom'
import { assert, isNumber } from './utils'

export default function useTimeout(
  ms: number = 1000
): [Ref<boolean>, () => void, () => void] {
  __DEV__ &&
    assert(
      isNumber(ms),
      'You must pass a boolean value for the `useToggle` function, received: ',
      ms
    )

  const currentInstance = getCurrentInstance()
  const refReady = ref(false)

  let timer: any = null
  function setTimer() {
    clear()
    timer = setTimeout(() => {
      refReady.value = true
    }, ms)
  }
  function clear() {
    refReady.value = false
    clearTimeout(timer)
  }

  setTimer()

  // `onUnmounted` is called to clear the timer only when there has a component instance.
  if (currentInstance) {
    onUnmounted(clear)
  }

  const runTimerAgain = setTimer // Just for a better name

  return [refReady, clear, runTimerAgain]
}
