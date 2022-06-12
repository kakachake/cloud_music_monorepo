// 视频相关api
import axRequest from '../index'

enum VIDEO_API {
  //获取mv视频详情
  GET_MV_VIDEO_DETAIL = '/mv/detail',
  //获取普通视频详情
  GET_VIDEO_DETAIL = '/video/detail',
  //获取mv视频地址
  GET_MV_VIDEO_URL = '/mv/url',
  //获取普通视频播放地址
  GET_VIDEO_URL = '/video/url',
  //获取MV评论
  GET_MV_VIDEO_COMMENT = '/comment/mv',
  //获取视频评论
  GET_VIDEO_COMMENT = '/comment/video',
  //获取最新MV
  GET_MV_VIDEO_NEW = '/mv/first',
  //获取网易出品MV
  GET_MV_VIDEO_NETEASE = '/mv/exclusive/rcmd',
  //获取视频标签列表
  GET_VIDEO_TAG_LIST = '/video/group/list',
  //获取视频分类列表
  GET_VIDEO_CATEGORY_LIST = '/video/category/list',
  //获取分类视频列表
  GET_VIDEO_CATEGORY_VIDEO_LIST = '/video/group',
  //获取全部视频列表
  GET_VIDEO_ALL_LIST = '/video/timeline/all'
}

//获取mv视频详情
export function getMVVideoDetail(mvid: string) {
  return axRequest.get({
    url: VIDEO_API.GET_MV_VIDEO_DETAIL,
    params: {
      mvid
    }
  })
}

//获取mv视频地址
export function getMVVideoUrl(id: string, r: number) {
  return axRequest.get({
    url: VIDEO_API.GET_MV_VIDEO_URL,
    params: {
      id,
      r
    }
  })
}

//获取普通视频地址
export function getVideoUrl(id: string, r?: number) {
  return axRequest.get({
    url: VIDEO_API.GET_VIDEO_URL,
    params: {
      id,
      r
    }
  })
}

export function getMVVideoComment(id: number | string, page: number) {
  return axRequest.get({
    url: VIDEO_API.GET_MV_VIDEO_COMMENT,
    params: {
      id,
      offset: (page - 1) * 20
    }
  })
}

//获取视频评论
export function getVideoComment(id: number | string, page: number) {
  return axRequest.get({
    url: VIDEO_API.GET_VIDEO_COMMENT,
    params: {
      id,
      offset: (page - 1) * 20
    }
  })
}

//获取最新MV
export function getMVVideoNew(area: string, limit = 30) {
  return axRequest.get({
    url: VIDEO_API.GET_MV_VIDEO_NEW,
    params: {
      limit,
      area
    }
  })
}

//获取网易出品MV
export function getMVVideoNetease(area: string, limit = 30) {
  return axRequest.get({
    url: VIDEO_API.GET_MV_VIDEO_NETEASE,
    params: {
      limit,
      area
    }
  })
}

//获取视频标签列表
export function getVideoTagList() {
  return axRequest.get({
    url: VIDEO_API.GET_VIDEO_TAG_LIST
  })
}

//获取视频分类列表
export function getVideoCategoryList() {
  return axRequest.get({
    url: VIDEO_API.GET_VIDEO_CATEGORY_LIST
  })
}

//获取分类视频列表
export function getVideoCategoryVideoList(id: number | string, page: number, limit = 30) {
  return axRequest.get({
    url: VIDEO_API.GET_VIDEO_CATEGORY_VIDEO_LIST,
    params: {
      id: id == -1 ? undefined : id,
      offset: (page - 1) * limit,
      limit
    }
  })
}

//获取全部视频列表
export function getVideoAllList(page: number, limit = 30) {
  return axRequest.get({
    url: VIDEO_API.GET_VIDEO_ALL_LIST,
    params: {
      offset: (page - 1) * limit,
      limit
    }
  })
}

//获取普通视频详情
export function getVideoDetail(id: string) {
  return axRequest.get({
    url: VIDEO_API.GET_VIDEO_DETAIL,
    params: {
      id
    }
  })
}
