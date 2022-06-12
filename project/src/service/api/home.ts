// 主页相关api
import axRequest from '../index'

enum HOME_API {
  //获取轮播图
  GET_BANNER = '/banner?type=2'
}

//获取轮播图
export function getBanner() {
  return axRequest.get({
    url: HOME_API.GET_BANNER
  })
}
