import { ref, Ref, UnwrapRef } from '@vue/runtime-dom'
import useTimeoutFn from './useTimeoutFn'

type State = 'idle' | 'pending' | 'success' | 'error' | 'timeout'
type RawFetcher<D> = (...args: any[]) => Promise<UnwrapRef<D>>
type Result<D, E> = {
  refData: Ref<D>
  refError: Ref<E>
  refState: Ref<State>
  runAsync: () => any
}

export default function useAsyncState<Data = any, Error = any>(
  asyncFn: () => ReturnType<RawFetcher<Data>>,
  options: {
    initial?: boolean
    timeout?: number
  } = {}
): Result<Data, Error> {
  const refData = ref<Data>()
  const refError = ref<Error>()
  const refState = ref<State>('idle')

  const [stop, runTimerAgain] = useTimeoutFn(() => {
    refState.value = 'timeout'
  }, options.timeout || 5000)
  !options.initial && stop()

  function runAsync() {
    refState.value = 'pending'
    runTimerAgain()

    asyncFn()
      .then(data => {
        console.log(data)
        if (refState.value === 'timeout') return
        stop()
        refData.value = data
        refState.value = 'success'
      })
      .catch(err => {
        if (refState.value === 'timeout') return
        stop()
        refError.value = err
        refState.value = 'error'
      })
  }
  options.initial && runAsync()

  return {
    refData,
    refError,
    refState,
    runAsync
  }
}
