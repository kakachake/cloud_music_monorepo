import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'
import { isGeneratorFunction } from 'util/types'
import { AxRequestInterceptor, AxRequestConfig } from './types'

class AxRequest {
  instance: AxiosInstance
  pendingRequests: Map<
    string,
    {
      controller: AbortController
      url: string
    }
  > = new Map()
  interceptors?: AxRequestInterceptor
  loading?: any

  constructor(config: AxRequestConfig) {
    this.instance = axios.create(config) //创建axios实例
    this.interceptors = config.interceptors

    //给实例设置拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestErrorInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseErrorInterceptor
    )
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      return response
    })
  }

  request<T = any>(config: AxRequestConfig<T>): Promise<T | any> {
    //给单个请求设置拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise((resolve, reject) => {
      const { url, signal } = config
      if (url && !signal) {
        const controller = new AbortController()
        config.signal = controller.signal
        const requestKey = generateReqKey(config)
        this.removePendingRequestByConfigByKey(requestKey)
        this.pendingRequests.set(requestKey, { controller, url })
      }
      this.instance
        .request<T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
          this.removePendingRequestByConfig(config)
        })
        .catch((error) => {
          // 如果不是取消请求再移除
          if (!(error.code === 'ERR_CANCELED')) {
            this.removePendingRequestByConfig(config)
          }
          reject(error)
        })
      // .finally(() => {

      // })
    })
  }

  get<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'get'
    })
  }

  post<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'post'
    })
  }

  put<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'put'
    })
  }

  delete<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'delete'
    })
  }

  removePendingRequestByConfigByKey(key: string) {
    if (this.pendingRequests.has(key)) {
      const { controller } = this.pendingRequests.get(key) || {}
      controller?.abort()
      this.pendingRequests.delete(key)
    }
  }

  removePendingRequestByConfig(config: AxRequestConfig) {
    const requestKey = generateReqKey(config)
    this.removePendingRequestByConfigByKey(requestKey)
  }

  removePendingByUrl(url: string) {
    this.pendingRequests.forEach((value, key) => {
      if (value.url === url) {
        const { controller } = value || {}
        controller?.abort()
        this.pendingRequests.delete(key)
      }
    })
  }
}

function generateReqKey(config: AxRequestConfig) {
  const { method, url, params = {}, data } = config

  // timerstamp和cookie不参与key的生成，因为可能会导致参数相同key不同
  const { timerstamp, cookie, ...parsedParams } = params

  return [method, url, qs.stringify(parsedParams), qs.stringify(data)].join('&')
}

export default AxRequest
