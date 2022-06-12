import { Artist } from '../../../type/album'

export interface Album {
  id: number
  name: string
  artist: Artist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}

export interface SearchSongType {
  id: number
  name: string
  artists: Artist[]
  album: Album
  duration: number
  copyrightId: number
  status: number
  alias: string[]
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl?: any
  mark: number
}
