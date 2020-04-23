import { h, createApp } from '@vue/runtime-dom'
import { css, injectGlobal } from 'emotion'
import metaData from './metaData'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

injectGlobal`
  :root {
    --sidebar-bg: #f7f7f7;
    --line-color: #999;
    --theme-color: #0088cc;
    --sidebar-width: 200px;
    --doc-height: 300px;
  }
  body {
    margin: 0
  }
  html, body, #app {
    height: 100%;
  }
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const App = {
  setup() {
    return () =>
      h(
        'div',
        {
          class: css`
            display: flex;
            height: 100%;
            overflow: auto;
          `
        },
        [h(Sidebar, { metaData }), h(Main, { metaData })]
      )
  }
}

createApp(App).mount('#app')
