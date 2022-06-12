import {
  DownloadOutlined,
  DownOutlined,
  HeartOutlined,
  ShareAltOutlined,
  StarOutlined,
  UpOutlined
} from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconFont } from '../../../../assets/css/iconFont'
import Like from '../../../../components/like/Like'
import { useIsLiked } from '../../../../hooks/useLikeList'
import { publicSlice } from '../../../../redux/publicSlice/slice'
import store, { RootState } from '../../../../redux/store'
import { downLoadMusic } from '../../../../service/api/music'
import { handleToggleLike } from '../../../../service/utils'
import style from './MusicBarLeft.module.css'
interface MusicBarLeftProps {}

const MusicBarLeft: FunctionComponent<MusicBarLeftProps> = () => {
  const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
  const toggleChange = () => {
    store.dispatch(publicSlice.actions.setSongDetailOpen(!songDetailOpen))
  }
  const songInfo = useSelector((state: RootState) => state.musicControl.musicInfo.song)
  const isLiked = useIsLiked()
  return (
    <div>
      {songInfo.name && (
        <div
          style={{
            transform: `${songDetailOpen ? 'translateY(-100%)' : 'translateY(0)'}`
          }}
          className={style.musicBarLeft}
        >
          {/* 默认显示歌曲信息 */}
          <div className={style.musicInfo}>
            <div onClick={toggleChange} className={style.musicPic}>
              <img src={songInfo?.al?.picUrl} alt='' />
              <UpOutlined className={style.musicPicHover} />
            </div>
            <div className={style.songInfo}>
              <div className={`line1 ${style.songInfoNameWrap}`}>
                <div className={`line1 ${style.songInfoName}`}>{songInfo.name + ' '}</div>
                <div className={style.songInfoHandle}>
                  <Like id={songInfo.id} />
                </div>
              </div>
              <div>
                <span className={`line1 ${style.songInfoAr}`}>
                  {songInfo?.ar?.map((item: any) => item.name).join('/')}
                </span>
              </div>
            </div>
          </div>
          {/* 点击后显示下面信息 */}
          <div className={style.musicDetailCut}>
            <div onClick={toggleChange} className={style.upBtn}>
              <DownOutlined />
            </div>
            <div className={style.musicDetailCutIcons}>
              <div className={style.musicDetailCutIconItem}>
                <Like id={songInfo.id} />
              </div>
              <div className={style.musicDetailCutIconItem}>
                <StarOutlined />
              </div>
              <div
                onClick={() => {
                  downLoadMusic(songInfo.id, songInfo.name)
                }}
                className={style.musicDetailCutIconItem}
              >
                <DownloadOutlined />
              </div>
              <div className={style.musicDetailCutIconItem}>
                <ShareAltOutlined />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicBarLeft
