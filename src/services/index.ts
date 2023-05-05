/*
 * @Author: hqk
 * @Date: 2022-12-21 19:28:46
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-27 11:42:42
 * @Description:
 */
import { BASE_URL, TIME_OUT } from './config'
import AppRequest from './request'
import { Modal, message } from 'antd'
import store from '@/store'
import { redirect } from 'react-router-dom'

const appRequest = new AppRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      // console.log('实例请求成功')
      //添加token
      const token = store.getState().login.loginUser?.token
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    responseSuccessFn(res: any) {
      //失败提示
      if ((res.code == 20000 || res.code == 500) && res.message) {
        message.error({
          key: 'service',
          content: res.message
        })
      }
      //成功提示
      if (res.code == 200 && res.message) {
        message.success({
          key: 'service',
          content: res.message
        })
      }
      if (res.code == 30001) {
        Modal.destroyAll()
        Modal.error({
          content: '登录过期，请重新登录',
          onOk() {
            window.location.href = '/login'
          }
        })
      }
      return res
    }
  }
})

export default appRequest
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return appRequest.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return appRequest.cancelAllRequest()
}
export * from './modules'
