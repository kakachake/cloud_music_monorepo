export interface ArtistType {
  id: string
  name: string
  picUrl: string
  albumSize: number
  alia: string[]
  alias: string[]
  img1v1Url: string
  mvSize: number
  followed: boolean
  trans: any
  cover: string
  transNames: any[]
  identities: any[]
  identifyTag?: any
  briefDesc: string
  rank: Rank
  musicSize: number
}

export interface Identify {
  imageUrl?: any
  imageDesc: string
  actionUrl: string
}

export interface Rank {
  rank: number
  type: number
}

export interface SecondaryExpertIdentiy {
  expertIdentiyId: number
  expertIdentiyName: string
  expertIdentiyCount: number
}

export interface ArtistDetailType {
  videoCount: number
  identify: Identify
  artist: ArtistType
  blacklist: boolean
  preferShow: number
  showPriMsg: boolean
  secondaryExpertIdentiy: SecondaryExpertIdentiy[]
}
