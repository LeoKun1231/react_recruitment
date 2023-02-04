/*
 * @Author: hqk
 * @Date: 2023-02-03 14:24:14
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-03 17:36:07
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'

import '@unocss/reset/normalize.css'
import '@/assets/css/index.less'

import 'uno.css'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
