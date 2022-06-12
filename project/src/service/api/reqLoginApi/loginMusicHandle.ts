//登陆后操作接口

import axRequest from '../../index'

enum LOGIN_MUSIC_API {
  //喜欢音乐
  LIKE_MUSIC = '/like'
}

//喜欢音乐
export function likeMusic(params: { id: string | number; like: boolean }) {
  return axRequest.get({
    url: LOGIN_MUSIC_API.LIKE_MUSIC,
    params
  })
}
