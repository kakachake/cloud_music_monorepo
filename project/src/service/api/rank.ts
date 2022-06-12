// 排行榜相关api
import axRequest from '../index'

enum HOME_API {
  //排行榜API
  GET_TOP_LIST = '/toplist'
}

//获取排行榜
export function getTopList() {
  return axRequest.get({
    url: HOME_API.GET_TOP_LIST
  })
}
