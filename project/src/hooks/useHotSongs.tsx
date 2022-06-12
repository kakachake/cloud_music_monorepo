import { useEffect, useState } from 'react'
import Toast from '../components/Toast'
import { getArtistHotsong } from '../service/api/artist'
import { SongType } from '../type/song'

export const useHotSongs = (id = '') => {
  if (!id) return [[], true] as [SongType[], boolean]
  const [hotSongs, setHotSongs] = useState<SongType[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getArtistHotsong(id)
      .then((res: any) => {
        setHotSongs(res.songs)
        setLoading(false)
        console.log(res)

        // setHotSongs(res.songs)
      })
      .catch(() => {
        console.log('获取歌手热门歌曲失败')
        Toast.error('获取歌手热门歌曲失败')
        setLoading(false)
      })
  }, [id])
  return [hotSongs, loading] as [SongType[], boolean]
}
