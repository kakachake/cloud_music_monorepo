import { ArtistType } from './artist'

export interface BrType {
  size: number
  br: number
  point: number
}

export interface MVVideoType {
  id: number
  name: string
  artistId: number
  artistName: string
  briefDesc: string
  desc: string
  cover: string
  coverId_str: string
  coverId: number
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  duration: number
  nType: number
  publishTime: string
  price?: any
  brs: BrType[]
  artists: ArtistType[]
  alias: any[]
  commentThreadId: string
  videoGroup: any[]
}
