import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHighQualitySongSheets, getHotSongSheets } from '../../../../service/api/music'
import { mainContentScroll } from '../../../../utils'

export const useGetSongSheet = () => {
  const [curPage, setCurPage] = useState(1)
  const [highquality, setHighquality] = useState<any>()
  const [playList, setPlayList] = useState<any[]>([])
  const [playListTotal, setPlayListTotal] = useState(0)
  const { type } = useParams()
  useEffect(() => {
    const cat = decodeURIComponent(type || '华语')
    getHighQualitySongSheets({ limit: 1, cat }).then((res) => {
      setHighquality(res.playlists?.[0])
    })
    getHotSongSheets({ cat: decodeURIComponent(type || '华语'), offset: (curPage - 1) * 20 }).then(
      (res) => {
        setPlayList(res.playlists)
        setPlayListTotal(res.total)
      }
    )
    mainContentScroll(0)
  }, [type, curPage])
  useEffect(() => {
    setCurPage(1)
  }, [type])
  return { highquality, playList, playListTotal, curPage, setCurPage }
}
