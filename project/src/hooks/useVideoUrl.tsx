import { useEffect, useState } from 'react'
import { getMVVideoUrl, getVideoUrl } from '../service/api/video'

export const useVideoUrl = (id: string, br: number, type: 'mv' | 'video') => {
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    type === 'mv'
      ? getMVVideoUrl(id, br).then((res) => {
          if (res.code === 200) {
            setUrl(res.data.url)
          }
        })
      : getVideoUrl(id, br).then((res) => {
          if (res.code === 200) {
            setUrl(res.urls?.[0].url)
          }
        })
  }, [id, br, type])
  return [url]
}
