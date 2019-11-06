export interface SWRConfig<D = any, E = any> {
  maxAge: number
  swr: number
  initial: boolean
  revalidateOnFocus: boolean
  focusThrottleInterval: number
  timeout: number

  // hooks
  onSuccess: (d: D, k: string, c: SWRConfig) => any
  onError: (e: E, k: string, c: SWRConfig) => any
}

const defaultConfig: SWRConfig = {
  maxAge: 0,
  swr: 0,
  initial: true,
  revalidateOnFocus: true,
  focusThrottleInterval: 5000,
  timeout: 5000,

  // hooks
  onSuccess: () => {},
  onError: () => {}
}

export default defaultConfig
