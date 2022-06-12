// 歌单相关api
import axRequest from '../../index'

enum SONG_SHEETS_API {
  //获取每日推荐歌单
  GET_DAILY_RECOMMEND = '/recommend/resource',
  //获取私人FM
  GET_PERSONAL_FM = '/personal_fm',
  //获取喜欢列表
  GET_LIKE_LIST = '/likelist',
  //搜藏歌单
  SUB_PLAY_LIST = '/playlist/subscribe'
}

//获取每日推荐歌单
export function getDailyRecommend() {
  return axRequest.get({
    url: SONG_SHEETS_API.GET_DAILY_RECOMMEND
  })
}

//获取私人FM
export function getPersonalFm() {
  return axRequest.get({
    url: SONG_SHEETS_API.GET_PERSONAL_FM
  })
}

//获取喜欢列表
export function getLikeList(uid: string | number) {
  return axRequest.get({
    url: SONG_SHEETS_API.GET_LIKE_LIST,
    params: {
      uid
    }
  })
}

//搜藏歌单
//t : 类型,1:收藏,2:取消收藏 id : 歌单 id
export function subPlayList(id: string | number, t: 1 | 0) {
  return axRequest.get({
    url: SONG_SHEETS_API.SUB_PLAY_LIST,
    params: {
      id,
      t
    }
  })
}
