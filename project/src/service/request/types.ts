import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxRequestInterceptor<T = any> {
  requestInterceptor?: (config: AxRequestConfig<T>) => AxRequestConfig<T>
  requestErrorInterceptor?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => any
  responseErrorInterceptor?: (error: any) => any
}

export interface AxRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: AxRequestInterceptor<T>
  showLoading?: boolean
}
