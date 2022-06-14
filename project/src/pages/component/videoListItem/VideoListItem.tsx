import { PlayCircleOutlined } from '@ant-design/icons'
import { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LazyImg } from '@cloud_music/nui'
import { useVideoUrl } from '../../../hooks/useVideoUrl'
import { MVType } from '../../../type/mv'
import { formatNumber } from '../../../utils'
import ArNameItem from '../arNameItem/ArNameItem'
import style from './VideoListItem.module.less'

interface VideoListItemProps {
  img: string
  name: string
  id: string
  type: 'mv' | 'video'
  playCount: number
  artists?: any[]
  anthor?: string
}

const VideoListItem: FC<VideoListItemProps> = (props) => {
  const { img, name, id, type, playCount, anthor, artists } = props
  const [preview, setPreview] = useState(false)
  const [url] = useVideoUrl(id, 720, type)
  const navigate = useNavigate()
  const previewVideo = useRef<HTMLVideoElement | null>(null)
  const handleToDetail = () => {
    type === 'mv' ? navigate(`/videoDetail/mv/${id}`) : navigate(`/videoDetail/v/${id}`)
  }
  const handlePreview = (preview: boolean) => {
    setPreview(preview)
  }

  useEffect(() => {
    previewVideo.current = document.getElementById('previewVideo' + id) as HTMLVideoElement
    if (previewVideo.current && preview) {
      previewVideo.current.play()
    } else {
      previewVideo.current?.pause()
    }
  }, [preview])

  return (
    <div
      onClick={handleToDetail}
      onMouseEnter={() => handlePreview(true)}
      onMouseLeave={() => handlePreview(false)}
      className={style.videoItemWrap}
    >
      {preview && (
        <div className={style.preview}>
          <video id={'previewVideo' + id} preload='none' src={url} autoPlay={false}></video>
        </div>
      )}

      <div className={style.videoImg}>
        <div className={style.playCount}>
          <PlayCircleOutlined className={style.playIcon} /> {formatNumber(playCount || 0)}
        </div>
        <LazyImg key={img} src={img + '?param=270y150'} />
      </div>
      <div className={style.content}>
        <div className={`line1 ${style.name}`}>{name}</div>
        {anthor && <div className={style.artists}>by {anthor}</div>}
        {artists && artists?.length > 0 && (
          <ArNameItem className={style.artists} artists={artists} />
        )}
      </div>
    </div>
  )
}

export default VideoListItem
