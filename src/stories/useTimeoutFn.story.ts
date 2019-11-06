import { h, ref } from '@vue/runtime-dom'
import { useTimeoutFn } from '../index'

export default {
  setup() {
    const refVal = ref(0)
    const [stop, runTimerAgain] = useTimeoutFn(() => {
      refVal.value++
    }, 1000)

    return () => [
      h('h1', 'Count: ' + refVal.value),
      h(
        'button',
        {
          onClick() {
            stop()
          }
        },
        'stop'
      ),
      h(
        'button',
        {
          onClick() {
            runTimerAgain()
          }
        },
        'runTimerAgain'
      )
    ]
  }
}

export const code = ``
