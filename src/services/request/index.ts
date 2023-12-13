import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AppRequestConfig, AppInterceptors } from '../config/type'
import { changeLoadingAction } from '@/store/features/common'
import store from '@/store'

class AppRequest {
  instance: AxiosInstance
  interceptors?: AppInterceptors
  abortControllerMap: Map<string, AbortController>
  constructor(config: AppRequestConfig) {
    this.instance = axios.create(config)
    // * 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map()
    this.interceptors = config.interceptors
    //全局拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        if (!config.isHidnLoading) {
          store.dispatch(changeLoadingAction(true))
        }
        const controller = new AbortController()
        const url = config.url || ''
        config.signal = controller.signal
        this.abortControllerMap.set(url, controller)
        // console.log('全局请求成功')
        return config
      },
      (err) => {
        store.dispatch(changeLoadingAction(false))
        // console.log('全局请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功')
        const url = res.config.url || ''
        this.abortControllerMap.delete(url)
        store.dispatch(changeLoadingAction(false))
        return res.data
      },
      (err) => {
        store.dispatch(changeLoadingAction(false))
        // console.log('全局响应成功')
        return err
      }
    )

    // 实例拦截器
    this.instance.interceptors.request.use(this.interceptors?.requestSuccessFn as any, this.interceptors?.requestFailureFn)
    this.instance.interceptors.response.use(this.interceptors?.responseSuccessFn, this.interceptors?.responseFailureFn)
  }

  request<T = any>(config: AppRequestConfig<T>) {
    //方法拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      return this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
  put<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort()
    }
    this.abortControllerMap.clear()
  }
  /**
   * 取消指定的请求
   * @param url 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
  }
}

export default AppRequest
