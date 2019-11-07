import { ref, Ref, UnwrapRef, computed, watch } from '@vue/runtime-dom'
import throttle from 'lodash.throttle'
import useLocalStorage from '../useLocalStorage'
import useVisibilityState from '../useVisibilityState'
import useWindowFocus from '../useWindowFocus'
import useTimeoutFn from '../useTimeoutFn'
import { setCache, getCache } from './cache'
import { now, isClient, isDef } from '../utils'
import defaultConfig, { SWRConfig } from './config'

export type UpdateReason = Ref<'fresh' | 'stale' | 'network'>
type SWRResult<D, E> = [
  () => any,
  {
    refData: Ref<D>
    refError: Ref<E>
    revalidate: () => any
    refReason: UpdateReason
  }
]

const STORAGE_KEY_PREFIX = 'USE_SWR_CACHED_TIME_'

type RawFetcher<D> = (...arg: any[]) => Promise<UnwrapRef<D>>
export type Fetcher<Data = any> = () => ReturnType<RawFetcher<Data>>

export default function useSWR<Data = any, Error = any>(
  key: string,
  fetch: Fetcher<Data>,
  options: Partial<SWRConfig<Data, Error>> = defaultConfig
): SWRResult<Data, Error> {
  const config = Object.assign({}, defaultConfig, options)
  const refData = ref<Data>()
  const refError = ref<Error>()
  const refReason: UpdateReason = ref('network')

  const refCachedTime = useLocalStorage(STORAGE_KEY_PREFIX + key, 0)
  const refMaxAge = computed(() => refCachedTime.value + config.maxAge)
  const refSwr = computed(() => refMaxAge.value + config.swr)

  async function performFetch() {
    const startTime = now()
    // Is fresh, use the cache to satisfy the request
    if (startTime <= refMaxAge.value) {
      refData.value = getCache(key)
      refReason.value = 'fresh'
      return
    }

    // The cached value will be stale, but will be used to fulfill the API request,
    // at the same time, "in the background", a revalidation request will be made.
    if (startTime <= refSwr.value) {
      refReason.value = 'stale'
      refData.value = getCache(key)
      if (isClient && isDef(window.requestIdleCallback)) {
        window.requestIdleCallback(revalidate)
      } else {
        revalidate()
      }
      return
    }

    // Requests fall outside of the `stale-while-revalidate` window,
    // getting the response from the network.

    await revalidate()
    refReason.value = 'network'
  }

  // revalidateId is used to determine whether the result of an asynchronous request is valid.
  let revalidateId = 0
  async function revalidate() {
    const currentId = ++revalidateId

    let isTimeout = false
    const [stopTimeoutFn] = useTimeoutFn(() => {
      config.onRevalidateTimeout(key, refReason.value, config)
      // Although the request has timed out, it is still possible to return data in the future,
      // so it is marked as timed out in order to discard future data.
      config.shouldTimeoutInvalid && (isTimeout = true)
    }, config.timeout)
    // If 0, the timeout is immediately turned off.
    if (!config.timeout) stopTimeoutFn()

    try {
      const res = await fetch()
      stopTimeoutFn()

      // Means that there is a newer `revalidation` here,
      // and invalidates the current `revalidation`.
      if (currentId < revalidateId || isTimeout) return

      refData.value = res
      setCache(key, refData.value)
      // call onSuccess hook
      config.onSuccess && config.onSuccess(refData.value, key, config)
      // update cachedTime
      refCachedTime.value = now()
    } catch (e) {
      stopTimeoutFn()
      // Means that there is a newer `revalidation` here,
      // and invalidates the current `revalidation`.
      if (currentId < revalidateId || isTimeout) return

      refError.value = e
      // call onError hook
      config.onError && config.onError(e, key, config)
    }
  }

  let lock = !config.initial
  // Re-fetch when visible & focus
  const onFocus = throttle(performFetch, config.focusThrottleInterval)
  config.revalidateOnFocus &&
    watch(
      [useVisibilityState(), useWindowFocus()],
      ([isVisible, isFocus]) => {
        !lock && (isVisible && isFocus) && onFocus()
      },
      { lazy: !config.initial }
    )

  const doFetch = () => {
    lock = false
    performFetch()
  }

  return [
    doFetch,
    {
      refData,
      refError,
      revalidate,
      refReason
    }
  ]
}
