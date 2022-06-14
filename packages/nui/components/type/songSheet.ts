import { SongType } from './song'

export interface SongSheetType {
  id: string
  name: string
  coverImgUrl: string
  playCount: number
  tags: string[]
  description: string
  creator: {
    nickname: string
    avatarUrl: string
  }
  tracks: SongType[]
  trackCount: number
  shareCount: number
  commentCount: number
  updateTime: number
  createTime: number
  subscribedCount: number
  subscribed: boolean
  userId: string
}
