import { watch, Ref } from '@vue/runtime-dom'
import useTimeout from './useTimeout'

export default function useTimeoutFn(
  cb: () => any,
  ms: number
): [() => any, () => any, Ref<boolean>] {
  const [refIsReady, clear, runTimerAgain] = useTimeout(ms)
  watch(
    refIsReady,
    maturity => {
      maturity && cb()
    },
    { immediate: true }
  )

  return [clear, runTimerAgain, refIsReady]
}
