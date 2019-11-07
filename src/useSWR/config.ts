import { Ref } from '@vue/runtime-dom'
import { UpdateReason } from './index'

type InferReason = UpdateReason extends Ref<infer R> ? R : never

export interface SWRConfig<D = any, E = any> {
  maxAge: number
  swr: number
  initial: boolean
  revalidateOnFocus: boolean
  focusThrottleInterval: number
  timeout: number
  shouldTimeoutInvalid: boolean

  // hooks
  onSuccess: (d: D, k: string, c: SWRConfig) => any
  onError: (e: E, k: string, c: SWRConfig) => any
  onRevalidateTimeout: (k: string, r: InferReason, c: SWRConfig) => any
}

const defaultConfig: SWRConfig = {
  maxAge: 0,
  swr: 0,
  initial: true,
  revalidateOnFocus: true,
  focusThrottleInterval: 5000,
  timeout: 5000,
  shouldTimeoutInvalid: true,

  // hooks
  onSuccess: () => {},
  onError: () => {},
  onRevalidateTimeout: () => {}
}

export default defaultConfig
