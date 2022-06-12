import { useEffect, useState } from 'react'
import { getMVVideoDetail, getMVVideoUrl, getVideoDetail, getVideoUrl } from '../service/api/video'
import { MVVideoType } from '../type/mvVideo'
import { VideoDetailType } from '../type/videoDetail'
import { parseBr } from '../utils'

export const useVideoDetail = (id = '') => {
  if (id == '') return [null, null]
  const [videoDetail, setVideoDetail] = useState<VideoDetailType>()
  const [videoUrl, setVideoUrl] = useState<
    {
      url: string
      type: string
      id: string
      br: string
    }[]
  >([])
  useEffect(() => {
    getVideoDetail(id).then((res) => {
      if (res.code === 200) {
        setVideoDetail(res.data)
        getVideoUrl(id).then((res) => {
          if (res.code === 200) {
            setVideoUrl(
              res.urls.map((item: any) => {
                return {
                  url: item.url,
                  type: parseBr(item.r),
                  id: item.r,
                  br: item.r
                }
              })
            )
          }
        })
      }
    })
  }, [])
  return [videoDetail, videoUrl] as [
    VideoDetailType,
    { url: string; type: string; id: string; br: string }[]
  ]
}
