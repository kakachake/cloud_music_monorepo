import { PlayCircleOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'
import { SongSheetsType } from '../../../service/api/type'
import { formatNumber } from '../../../utils'
import style from './SongSheetItem.module.css'
import { useNavigate } from 'react-router-dom'
import playListImg from '../../../assets/img/playListImg.png'
import { ToplistType } from '../../../type/topListItem'
import { LazyImg } from '@cloud_music/nui'
interface SongSheetItemProps {
  songSheetInfo: Partial<SongSheetsType & ToplistType>
}

const SongSheetItem: FunctionComponent<SongSheetItemProps> = ({ songSheetInfo }) => {
  const navigate = useNavigate()
  const handleToSongSheet = () => {
    navigate(`/songSheet/${songSheetInfo.id}`)
  }
  return (
    <div onClick={handleToSongSheet} className={style.songSheetItem}>
      <div className={style.contentWrap}>
        <LazyImg
          src={
            ((songSheetInfo.picUrl || songSheetInfo.coverImgUrl) ?? playListImg) + '?param=300y300'
          }
        />
        <div className={style.content}>
          <div className={style.playCount}>
            <PlayCircleOutlined className={style.playIcon} />
            {formatNumber(songSheetInfo.playCount || songSheetInfo.playcount || 0)}
          </div>
          <div className={style.hoverWrap}>
            <PlayCircleOutlined className={style.playIcon} />
          </div>
        </div>
      </div>
      <div className={`${style.songSheetName} line2`}>{songSheetInfo.name}</div>
    </div>
  )
}

export default SongSheetItem
