import axRequest from '../../'

enum USER_API {
  // 获取用户信息
  GET_USER_INFO = '/user/detail'
}

// 获取用户信息
export function getUserInfo(uid: string) {
  return axRequest.get({
    url: USER_API.GET_USER_INFO,
    params: {
      uid
    }
  })
}
