/*
 * @Author: hqk
 * @Date: 2023-02-16 11:20:26
 * @LastEditors: leo
 * @LastEditTime: 2023-05-22 00:50:05
 * @Description:
 */
import App from '@/App'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import '@/assets/css/index.less'
import '@unocss/reset/normalize.css'

import 'uno.css'
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </DndProvider>
  // </React.StrictMode>
)
