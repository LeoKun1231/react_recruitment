/*
 * @Author: hqk
 * @Date: 2023-02-03 14:24:14
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-24 21:17:33
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import App from '@/App'

import '@unocss/reset/normalize.css'
import '@/assets/css/index.less'

import 'uno.css'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </DndProvider>
  // </React.StrictMode>
)
