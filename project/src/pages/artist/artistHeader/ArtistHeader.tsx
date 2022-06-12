import { StarOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { ArtistDetailType } from '../../../type/artist'
import HeaderButton from '../../component/headerButton/HeaderButton'
import style from './ArtistHeader.module.css'
interface ArtistHeaderProps {
  artist: ArtistDetailType
  toggleSubscribe?: () => void
}

const ArtistHeader: FC<ArtistHeaderProps> = (props) => {
  const { artist, toggleSubscribe } = props

  return (
    <div className={style.headerWrap}>
      <div className={style.pic}>
        <img src={artist.artist.cover} alt='' />
      </div>
      <div className={style.headerRight}>
        <div className={style.name}>{artist.artist.name}</div>
        <HeaderButton icon={<StarOutlined />} onClick={toggleSubscribe} content={'收藏'} />
        <div className={style.count}>
          <div>单曲数：{artist.artist.musicSize}</div>
          <div>专辑数：{artist.artist.albumSize}</div>
          <div>MV数：{artist.artist.mvSize}</div>
        </div>
      </div>
    </div>
  )
}

export default ArtistHeader
