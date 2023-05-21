/*
 * @Author: hqk
 * @Date: 2023-02-16 11:20:26
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-21 23:21:27
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

import { Provider } from 'react-redux'
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
