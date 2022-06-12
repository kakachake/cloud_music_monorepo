// 歌手相关api
import axRequest from '../index'

enum HOME_API {
  //获取歌手详细信息
  GET_ARTIST_DETAIL = '/artist/detail',
  //获取歌手专辑
  GET_ARTIST_ALBUM = '/artist/album',
  //获取歌手Hotsongs
  GET_ARTIST_HOTSONG = '/artist/top/song',
  //获取歌手描述
  GET_ARTIST_DESC = '/artist/desc',
  //歌手分类列表
  GET_ARTIST_CATEGORY = '/artist/list'
}

// 获取歌手详细信息
export function getArtistDetail(id: string) {
  return axRequest.get({
    url: HOME_API.GET_ARTIST_DETAIL,
    params: {
      id
    }
  })
}

// 获取歌手专辑
export function getArtistAlbums(id: string) {
  return axRequest.get({
    url: HOME_API.GET_ARTIST_ALBUM,
    params: {
      id
    }
  })
}

// 获取歌手Hotsongs
export function getArtistHotsong(id: string) {
  return axRequest.get({
    url: HOME_API.GET_ARTIST_HOTSONG,
    params: {
      id
    }
  })
}

//获取歌手描述
export function getArtistDesc(id: string) {
  return axRequest.get({
    url: HOME_API.GET_ARTIST_DESC,
    params: {
      id
    }
  })
}

//歌手分类列表
export function getArtistCategory({
  curPage,
  type,
  area,
  initial
}: {
  curPage: number
  type: number
  area: number
  initial: string
}) {
  return axRequest.get({
    url: HOME_API.GET_ARTIST_CATEGORY,
    params: {
      limit: 30,
      offset: (curPage - 1) * 30,
      type,
      area,
      initial
    }
  })
}
