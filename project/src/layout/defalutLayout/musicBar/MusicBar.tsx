import { FC } from 'react'
import style from './musicBar.module.css'
import MusicControl from '../../../components/musicControl/MusicControl'

import { connect } from 'react-redux'
import VolumeControl from '../../../components/volumeControl/VolumeControl'
import { IconFont } from '../../../assets/css/iconFont'
import audioInstance from '../../../controller/musicPlayer'
import { useSelector } from '../../../redux/hooks'
import store, { RootState } from '../../../redux/store'
import MusicBarLeft from './musicBarLeft/MusicBarLeft'
import { publicSlice } from '../../../redux/publicSlice/slice'
interface MusicBarProps {
  mode?: 'white' | 'dark'
  showBorder?: boolean
  id?: string
}

const MusicBar: FC<MusicBarProps> = ({ showBorder = true, mode = 'dark', id }) => {
  const isMute = useSelector((state: RootState) => state.musicControl.isMute)

  const toggleVolume = () => {
    audioInstance.toggleVolume()
  }
  const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
  const toggleChange = () => {
    store.dispatch(publicSlice.actions.setSongDetailOpen(!songDetailOpen))
  }
  const handleOpenList = () => {
    store.dispatch(publicSlice.actions.setCurSideOpen('playList'))
  }

  return (
    <div
      id='musicBar'
      style={showBorder ? {} : { border: 'none' }}
      className={`${style.musicBar} ${mode === 'white' ? style.white : ''}`}
    >
      <div className={style.musicInfo}>
        <MusicBarLeft />
      </div>
      <div className={style.play}>
        <MusicControl />
      </div>
      <div className={style.other}>
        <div className={style.volume}>
          <IconFont
            onClick={toggleVolume}
            className={style.icon}
            type={`${isMute ? 'icon-sound-off' : 'icon-sound-on'}`}
          />
          <div className={style.volumeControl}>
            <VolumeControl id={id} />
          </div>
        </div>
        <IconFont onClick={handleOpenList} className={style.icon} type={`icon-playlist`} />
      </div>
    </div>
  )
}

export default MusicBar
