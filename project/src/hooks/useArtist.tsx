import { useEffect, useState } from 'react'
import Toast from '../components/Toast'
import { getArtistDetail } from '../service/api/artist'
import { ArtistDetailType, ArtistType } from '../type/artist'
import { SongType } from '../type/song'

export const useArtist = (id = '') => {
  const [artist, setArtist] = useState<ArtistDetailType>({} as ArtistDetailType)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    setLoading(true)
    getArtistDetail(id)
      .then((res) => {
        setArtist(res.data)
      })
      .catch(() => {
        Toast.error('获取歌手详情失败')
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])
  return [artist, loading, error] as [ArtistDetailType, boolean, boolean]
}
