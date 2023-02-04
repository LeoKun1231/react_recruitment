/*
 * @Author: hqk
 * @Date: 2022-12-21 19:28:46
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-03 18:18:35
 * @Description:
 */
import { BASE_URL, TIME_OUT } from './config'
import AppRequest from './request'

const appRequest = new AppRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      // console.log('实例请求成功')
      //添加token
      if (config.headers) {
        // config.headers.Authorization = 'Bearer ' + '写入token'
      }
      return config
    },
    responseSuccessFn(res) {
      // console.log('实例响应成功')
      return res
    }
  }
})

export default appRequest
