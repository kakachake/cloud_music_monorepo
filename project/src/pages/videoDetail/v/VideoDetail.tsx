import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Toast from '../../../components/Toast'

import { VideoPlayer } from '@cloud_music/nui'
import { useVideoDetail } from '../../../hooks/useVideoDetail'
import { comment_type } from '../../../service/api/comment'

import { formatNumber, formatTime, splitN } from '../../../utils'
import CommentTabPage from '../../component/commentTabPage/CommentTabPage'
import style from './VideoDetail.module.css'
interface VideoDetailProps {}

const VideoDetail: FC<VideoDetailProps> = () => {
  const { type, id } = useParams()
  const [showDesc, setShowDesc] = useState(false)
  const [videoDetail, videoUrl] = useVideoDetail(id)
  console.log(videoDetail, videoUrl)
  const navigate = useNavigate()

  return (
    <div className={`${style.detailWrap}`}>
      <div className={style.mainContent}>
        <div className={style.contentHeader}>
          <div className={style.videoTitle}>{videoDetail?.title}</div>
          <div className={style.videoInfo}>
            <span className={style.infoItem}>
              发布：{formatTime(videoDetail?.publishTime || '', 'YYYY-MM-DD')}
            </span>{' '}
            <span className={style.infoItem}>播放：{formatNumber(videoDetail?.playTime || 0)}</span>{' '}
          </div>
        </div>
        <VideoPlayer
          autoplay={true}
          urls={videoUrl || []}
          defaultId={videoUrl?.[0]?.type}
          width={721}
          height={452}
          src='http://vodkgeyttp8.vod.126.net/cloudmusic/067f/core/544a/4c9d548f05dc019dc4f14f294abc912f.mp4?wsSecret=25a51a90ceaac8b45140f5c2c62ee4a8&wsTime=1653896978'
        />
        <div className={`${style.videoBaseInfo} `}>
          <div className={style.anthor}>
            <img src={videoDetail?.creator.avatarUrl} alt='' />
            <span className={style.anthorName}>{videoDetail?.creator?.nickname}</span>
          </div>
          {videoDetail?.description && (
            <div className={`${style.descWrap} ${showDesc ? style.descMore : ''}`}>
              {splitN(videoDetail?.description)?.map((item) => {
                return (
                  <p className={style.desc} key={item}>
                    {item}
                  </p>
                )
              })}
            </div>
          )}
        </div>

        <div className={style.commentWrap}>
          <CommentTabPage id={id!} type='Video' />
        </div>
      </div>
      <div className={style.sideBar}></div>
    </div>
  )
}

export default VideoDetail
