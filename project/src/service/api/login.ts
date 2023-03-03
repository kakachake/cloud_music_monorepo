import axRequest from '../index'

enum LoginAPI {
  //获取二维码Key
  GET_QRCODE_KEY = '/login/qr/key',
  //生成二维码接口
  GET_QRCODE_IMAGE = '/login/qr/create',
  //检测二维码状态
  CHECK_QRCODE_STATUS = '/login/qr/check',
  //检测登录状态
  CHECK_LOGIN_STATUS = '/login/status',
  //获取用户歌单
  GET_USER_PLAYLIST = '/user/playlist',
  // 发送验证码
  SEND_VERIFY_CODE = '/captcha/sent',
  // 手机登录
  PHONE_LOGIN = '/login/cellphone'
}

//获取二维码key
export function getQRCodeKey() {
  return axRequest.get({
    url: LoginAPI.GET_QRCODE_KEY,
    params: {
      timerstamp: +Date.now()
    }
  })
}

//生成二维码
export function getQRCodeImage(key: string) {
  return axRequest.get({
    url: LoginAPI.GET_QRCODE_IMAGE,
    params: {
      key,
      timerstamp: +Date.now(),
      qrimg: true
    }
  })
}

//检测二维码状态
export function checkQRCodeStatus(key: string) {
  return axRequest.get({
    url: LoginAPI.CHECK_QRCODE_STATUS,
    params: {
      key,
      timerstamp: +Date.now()
    }
  })
}

//检测登陆状态
export function checkLoginStatus() {
  return axRequest.get({
    url: LoginAPI.CHECK_LOGIN_STATUS
  })
}

//获取用户歌单
export function getUserPlayList(uid: string) {
  console.log('getUserPlayList')

  return axRequest.get({
    url: LoginAPI.GET_USER_PLAYLIST,
    params: {
      uid
    }
  })
}

//发送验证码
export function sendVerifyCode(phone: string) {
  return axRequest.get({
    url: LoginAPI.SEND_VERIFY_CODE,
    params: {
      phone
    }
  })
}

//手机登录
export function phoneLogin({
  phone,
  captcha,
  password
}: {
  phone: string
  captcha?: string
  password?: string
}) {
  return axRequest.post({
    url: LoginAPI.PHONE_LOGIN,
    data: {
      phone,
      password,
      captcha
    }
  })
}
