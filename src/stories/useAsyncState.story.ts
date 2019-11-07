import { h } from '@vue/runtime-dom'
import { useAsyncState } from '../index'

function fetch() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ foo: 1 })
    }, 2000)
  })
}

export default {
  setup() {
    const { refData, refError, refState, runAsync } = useAsyncState(() =>
      fetch()
    )

    return () => [
      h('h1', 'State: ' + refState.value),
      h('p', 'Data: ' + JSON.stringify(refData.value)),
      refError.value && h('p', 'Error: ' + JSON.stringify(refError.value)),
      h(
        'div',
        h(
          'button',
          {
            onClick() {
              runAsync()
            }
          },
          'Run Async'
        )
      )
    ]
  }
}

export const code = `
function fetch() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ foo: 1 })
    }, 2000)
  })
}

export default {
  setup() {
    const { refData, refError, refState, runAsync } = useAsyncState(() =>
      fetch()
    )

    return () => [
      h('h1', 'State: ' + refState.value),
      h('p', 'Data: ' + JSON.stringify(refData.value)),
      refError.value && h('p', 'Error: ' + JSON.stringify(refError.value)),
      h(
        'div',
        h(
          'button',
          {
            onClick() {
              runAsync
            }
          },
          'Run Async'
        )
      )
    ]
  }
}
`
