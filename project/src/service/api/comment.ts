// 主页相关api
import axRequest from '../index'

enum COMMENT_API {
  //获取热门评论
  GET_HOT_COMMENT = '/comment/hot',
  //点赞评论
  LIKE_COMMENT = '/comment/like'
}

export enum comment_type {
  'Song' = 0,
  'MV' = 1,
  'PlayList' = 2,
  'Album' = 3,
  'Video' = 5
}

//获取热门评论
export function getHotComment(id: string, type: comment_type, page = 1, limit = 20) {
  return axRequest.get({
    url: COMMENT_API.GET_HOT_COMMENT,
    params: {
      id,
      limit,
      offset: (page - 1) * limit,
      type
    }
  })
}

// 点赞评论
// 是否点赞 , 1 为点赞 ,0 为取消点赞
export function likeComment(id: string, cid: number, type: comment_type, t: 0 | 1) {
  return axRequest.get({
    url: COMMENT_API.LIKE_COMMENT,
    params: {
      id,
      cid,
      type,
      t
    }
  })
}
