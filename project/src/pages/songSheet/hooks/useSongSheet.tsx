import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axRequest from '../../../service'
import { getPlaylistComment, getPlaylistDetail, MUSIC_API } from '../../../service/api/music'
import { formatNumber } from '../../../utils'

export const useSongSheet = (id: string) => {
  const location = useLocation()
  const [songSheetInfo, setSongSheetInfo] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [tabList, setTabList] = useState<any[]>([])

  const handleGetPlaylistDetail = async (controller: AbortController) => {
    setLoading(true)

    // 取消之前的请求
    // axRequest.removePendingByUrl(MUSIC_API.GET_PLAYLIST_DETAIL)
    getPlaylistDetail(id!, { signal: controller.signal })
      .then((res) => {
        setSongSheetInfo(res.playlist)
        setTabList([
          {
            title: '歌曲列表',
            id: 'playList'
          },
          {
            title: `评论 (${formatNumber(res.playlist.commentCount)})`,
            id: 'comment'
          },
          {
            title: '收藏者',
            id: 'favoriter'
          }
        ])
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    const controller = new AbortController()
    handleGetPlaylistDetail(controller)
    return () => {
      console.log('移除')

      controller.abort()
    }
  }, [id])
  return { songSheetInfo, tabList, handleGetPlaylistDetail, loading }
}
