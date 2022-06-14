export interface Resolution {
  resolution: number
  size: number
}

export interface Creator {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags?: any
  experts?: any
  djStatus: number
  vipType: number
  remarkName?: any
  avatarImgIdStr: string
  backgroundImgIdStr: string
}

export interface VideoGroup {
  id: number
  name: string
  alg?: any
}

export interface VideoType {
  alg: string
  scm: string
  threadId: string
  coverUrl: string
  height: number
  width: number
  title: string
  description: string
  commentCount: number
  shareCount: number
  resolutions: Resolution[]
  creator: Creator
  urlInfo?: any
  videoGroup: VideoGroup[]
  previewUrl: string
  previewDurationms: number
  hasRelatedGameAd: boolean
  markTypes?: any
  relateSong: any[]
  relatedInfo?: any
  videoUserLiveInfo?: any
  vid: string
  durationms: number
  playTime: number
  praisedCount: number
  praised: boolean
  subscribed: boolean
}
