import { useEffect, useState } from 'react'
import { getMVVideoDetail, getMVVideoUrl } from '../service/api/video'
import { MVVideoType } from '../type/mvVideo'
import { parseBr } from '../utils'

export const useMVDetail = (id = '') => {
  if (id == '') return [null, null]
  const [videoDetail, setVideoDetail] = useState<MVVideoType>()
  const [videoUrl, setVideoUrl] = useState<
    {
      url: string
      type: string
      id: string
      br: string
    }[]
  >([])
  useEffect(() => {
    getMVVideoDetail(id).then((res) => {
      if (res.code === 200) {
        setVideoDetail(res.data)
        Promise.allSettled(
          res.data.brs.map(async (item: any) => {
            const br = item.br
            const { data } = await getMVVideoUrl(id, br)
            return {
              url: data.url,
              type: parseBr(br),
              id: br,
              br: br
            }
          })
        ).then((res) => {
          const url = res.filter((item) => item.status === 'fulfilled')
          setVideoUrl(url.map((item: any) => item.value))
        })
      }
    })
  }, [])
  return [videoDetail, videoUrl] as [
    MVVideoType,
    { url: string; type: string; id: string; br: string }[]
  ]
}
