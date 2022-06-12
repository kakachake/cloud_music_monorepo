import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from '@cloud_music/nui'
import { VideoPlayer } from '@cloud_music/nui'
import { useMVDetail } from '../../../hooks/useMVDetail'

import { formatNumber, formatTime, splitN } from '../../../utils'
import CommentTabPage from '../../component/commentTabPage/CommentTabPage'
import style from './MVDetail.module.css'
interface MVDetailProps {}

const MVDetail: FC<MVDetailProps> = () => {
  const { type, id } = useParams()
  const [showDesc, setShowDesc] = useState(false)
  const [mvDetail, mvUrl] = useMVDetail(id)
  console.log(mvDetail, mvUrl)
  const navigate = useNavigate()
  const handleToAr = (id: string) => {
    console.log(id)

    if (+id === 0) {
      Toast.error('暂无该歌手信息！')
      return
    }
    navigate('/artist/' + id)
  }
  return (
    <div className={`${style.detailWrap}`}>
      <div className={style.mainContent}>
        <div className={style.contentHeader}>
          <div className={style.mvTitle}>{mvDetail?.name}</div>
          <div className={style.mvInfo}>
            <span className={style.infoItem}>
              发布：{formatTime(mvDetail?.publishTime || '', 'YYYY-MM-DD')}
            </span>{' '}
            <span className={style.infoItem}>播放：{formatNumber(mvDetail?.playCount || 0)}</span>{' '}
          </div>
        </div>
        <VideoPlayer
          urls={mvUrl || []}
          defaultId={1080}
          width={721}
          height={452}
          src='http://vodkgeyttp8.vod.126.net/cloudmusic/067f/core/544a/4c9d548f05dc019dc4f14f294abc912f.mp4?wsSecret=25a51a90ceaac8b45140f5c2c62ee4a8&wsTime=1653896978'
        />
        <div className={`${style.mvBaseInfo} `}>
          <div className={style.artists}>
            {mvDetail?.artists?.map((item, index: number) => {
              return (
                <div
                  onClick={() => {
                    handleToAr(item.id)
                  }}
                  key={index}
                  className={style.artist}
                >
                  <img src={item.img1v1Url} alt='' />
                  <div className={style.artistsName}>{item.name}</div>
                </div>
              )
            })}
          </div>
          {mvDetail?.desc && (
            <div className={`${style.descWrap} ${showDesc ? style.descMore : ''}`}>
              {splitN(mvDetail?.desc)?.map((item) => {
                return (
                  <p className={style.desc} key={item}>
                    {item}
                  </p>
                )
              })}
            </div>
          )}
          <div
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              setShowDesc(!showDesc)
            }}
          >
            {showDesc ? (
              <div>
                收起
                <CaretUpOutlined />
              </div>
            ) : (
              <div>
                展开更多
                <CaretDownOutlined />
              </div>
            )}
          </div>
        </div>
        <div className={style.commentWrap}>
          <CommentTabPage id={id!} type='MV' />
        </div>
      </div>
      <div className={style.sideBar}></div>
    </div>
  )
}

export default MVDetail
