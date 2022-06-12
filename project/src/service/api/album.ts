// 专辑相关api
import axRequest from '../index'

enum ALBUM_API {
  //获取专辑内容
  GET_ALBUM_DETAIL = '/album',
  //获取专辑评论
  GET_ALBUM_COMMENT = '/comment/album'
}

//获取专辑内容
export function getAlbumDetail(id: number | string) {
  return axRequest.get({
    url: ALBUM_API.GET_ALBUM_DETAIL,
    params: {
      id
    }
  })
}

//获取专辑评论
export function getAlbumComment(id: number | string, page: number) {
  return axRequest.get({
    url: ALBUM_API.GET_ALBUM_COMMENT,
    params: {
      id,
      offset: (page - 1) * 20
    }
  })
}
