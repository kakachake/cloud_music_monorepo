import AxRequest from './request/index'
import { BASE_URL } from './request/config'
import store from '../redux/store'
import Toast from '../components/Toast'

const axRequest = new AxRequest({
  baseURL: BASE_URL,
  timeout: 20000,
  interceptors: {
    requestInterceptor: (config) => {
      const cookie = localStorage.getItem('cookie')
      config.params = config.params || {}
      if (cookie) {
        config.params.cookie = cookie
      }
      config.params.timerstamp = +Date.now()
      return config
    },
    responseInterceptor: (res) => {
      //可以只把我们需要的数据返回
      return {
        ...res.data,
        config: res.config
      }
    },
    responseErrorInterceptor: (error) => {
      console.log(error)
      if (!(error.code === 'ERR_CANCELED')) {
        // 取消请求的错误不需要弹窗
        // Toast.error(error.message)
      }
      throw error
    }
  }
})

export default axRequest
