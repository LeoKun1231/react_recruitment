/*
 * @Author: hqk
 * @Date: 2023-02-16 11:20:26
 * @LastEditors: leo
 * @LastEditTime: 2023-05-22 00:50:05
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import App from '@/App'

import '@unocss/reset/normalize.css'
import '@/assets/css/index.less'

import 'uno.css'
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
