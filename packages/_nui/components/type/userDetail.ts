export interface UserPoint {
  userId: number
  balance: number
  updateTime: number
  version: number
  status: number
  blockBalance: number
}

export interface PrivacyItemUnlimit {
  area: boolean
  college: boolean
  age: boolean
  villageAge: boolean
}

export interface Experts {}

export interface UserProfile {
  privacyItemUnlimit: PrivacyItemUnlimit
  avatarDetail?: any
  avatarImgIdStr: string
  backgroundImgIdStr: string
  mutual: boolean
  remarkName?: any
  avatarImgId: number
  birthday: number
  gender: number
  nickname: string
  userType: number
  createTime: number
  defaultAvatar: boolean
  avatarUrl: string
  backgroundImgId: number
  backgroundUrl: string
  province: number
  city: number
  followed: boolean
  djStatus: number
  vipType: number
  accountStatus: number
  authStatus: number
  detailDescription: string
  experts: Experts
  expertTags?: any
  description: string
  userId: number
  signature: string
  authority: number
  followeds: number
  follows: number
  blacklist: boolean
  eventCount: number
  allSubscribedCount: number
  playlistBeSubscribedCount: number
  avatarImgId_str: string
  followTime?: any
  followMe: boolean
  artistIdentity: any[]
  cCount: number
  inBlacklist: boolean
  sDJPCount: number
  playlistCount: number
  sCount: number
  newFollows: number
}

export interface Binding {
  expired: boolean
  expiresIn: number
  refreshTime: number
  bindingTime: any
  tokenJsonStr?: any
  url: string
  userId: number
  id: any
  type: number
}

export interface ProfileVillageInfo {
  title: string
  imageUrl: string
  targetUrl: string
}

export interface UserDetailType {
  level: number
  listenSongs: number
  userPoint: UserPoint
  mobileSign: boolean
  pcSign: boolean
  profile: UserProfile
  peopleCanSeeMyPlayRecord: boolean
  bindings: Binding[]
  adValid: boolean
  code: number
  createTime: number
  createDays: number
  profileVillageInfo: ProfileVillageInfo
}
