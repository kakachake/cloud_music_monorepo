import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAlbumComment, getAlbumDetail } from '../../../service/api/album'
import { AlbumType } from '../../../type/album'
import { SongType } from '../../../type/song'
import { formatNumber } from '../../../utils'

export const useAlbum = (id: string) => {
  const location = useLocation()
  const [albumInfo, setAlbumInfoInfo] = useState<{
    album: AlbumType
    songs: SongType[]
  }>()
  const [tabList, setTabList] = useState<any[]>([])
  const handleGetPlaylistDetail = () => {
    getAlbumDetail(id!).then((res) => {
      setAlbumInfoInfo({
        album: res.album,
        songs: res.songs
      })
      setTabList([
        {
          title: '歌曲列表',
          id: 'playList'
        },
        {
          title: `评论 (${formatNumber(res.album.info.commentCount)})`,
          id: 'comment'
        },
        {
          title: '收藏者',
          id: 'favoriter'
        }
      ])
    })
  }
  useEffect(() => {
    handleGetPlaylistDetail()
  }, [id])
  return { albumInfo, tabList, handleGetPlaylistDetail }
}
