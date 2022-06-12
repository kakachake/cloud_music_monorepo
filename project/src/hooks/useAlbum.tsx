import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAlbumDetail } from '../service/api/album'
import { AlbumType } from '../type/album'
import { SongType } from '../type/song'

export const useAlbum = (id: string) => {
  const location = useLocation()
  const [albumInfo, setAlbumInfoInfo] = useState<{
    album: AlbumType
    songs: SongType[]
  }>()

  const handleGetPlaylistDetail = () => {
    getAlbumDetail(id!).then((res) => {
      setAlbumInfoInfo({
        album: res.album,
        songs: res.songs
      })
    })
  }
  useEffect(() => {
    handleGetPlaylistDetail()
  }, [id])
  return { albumInfo }
}
