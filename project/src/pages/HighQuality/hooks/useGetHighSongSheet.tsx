import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHighQualitySongSheets } from '../../../service/api/music'

export const useGetHighSongSheet = () => {
  const [highQualityList, setHighQualityList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const lock = useRef(false)
  const [hasMore, setHasMore] = useState(true)
  const { type } = useParams()

  useEffect(() => {
    const cat = decodeURIComponent(type || '华语')
    const before = highQualityList[highQualityList.length - 1]?.updateTime ?? ''
    setIsLoading(true)
    getHighQualitySongSheets({ limit: 24, cat, before })
      .then((res) => {
        setHighQualityList([...res.playlists])
        setHasMore(res.more)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const getMore = useCallback(() => {
    if (lock.current) {
      return
    }

    const cat = decodeURIComponent(type || '华语')
    const before = highQualityList[highQualityList.length - 1]?.updateTime ?? ''
    console.log(highQualityList)
    lock.current = true
    setIsLoading(true)
    getHighQualitySongSheets({ limit: 24, cat, before })
      .then((res) => {
        setHighQualityList((highQualityList) => [...highQualityList, ...res.playlists])
        setHasMore(res.more)
      })
      .finally(() => {
        lock.current = false
        setIsLoading(false)
      })
  }, [highQualityList])

  return { highQualityList, isLoading, hasMore, getMore }
}
