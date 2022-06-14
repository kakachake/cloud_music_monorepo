export interface Artist {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: any[]
  trans: string
  musicSize: number
  topicPerson: number
}

export interface AlbumType {
  name: string
  id: string
  type: string
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company: string
  briefDesc: string
  artist: Artist
  songs: any[]
  alias: any[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artist[]
  subType: string
  transName?: any
  onSale: boolean
  mark: number
  gapless: number
  picId_str: string
}
