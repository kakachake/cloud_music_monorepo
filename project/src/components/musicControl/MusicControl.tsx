import React from 'react'
import style from './MusicControl.module.css'
import { createFromIconfontCN } from '@ant-design/icons'
import { parseSecondToTime } from '../../utils'
import { connect } from 'react-redux'
import store, { RootState } from '../../redux/store'
import { changeMusic } from '../../controller/musicControl'
import { musicControlSlice, MusicControlState } from '../../redux/musicControl/slice'
import audioInstance from '../../controller/musicPlayer'
import { MusicListState } from '../../redux/musicList/slice'
import { ProgressBar } from '@cloud_music/nui'

const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_3370146_f9nlawuexbc.js'
})

interface StateType {
  percent: number
}

interface PropsType extends MusicControlState, MusicListState {
  setCurTime: (curTime: number) => void
  setDuration: (duration: number) => void
  setIsPlay: (isPlay: boolean) => void
  setProgress: (progress: number) => void
  setAdjust: (adjust: boolean) => void
}

class MusicControl extends React.Component<PropsType, StateType> {
  audio: HTMLAudioElement | undefined
  constructor(props: PropsType) {
    super(props)
    this.state = {
      percent: 0
    }
  }

  handleTogglePlay = () => {
    console.log('toggle')

    audioInstance.togglePlay()
  }
  setPercent = (percent: number) => {
    audioInstance.setCurrentTime((percent / 100) * this.props.duration)
    this.props.setProgress(percent)
  }
  render() {
    return (
      <div className={style.musicControl}>
        <div className={style.top}>
          <IconFont
            onClick={() => changeMusic(-1)}
            className={style.icon}
            type='icon-play-previous'
          />
          <IconFont
            className={`${style.playIcon} ${style.icon}`}
            onClick={this.handleTogglePlay}
            type={this.props.isPlaying ? 'icon-pause' : 'icon-play'}
          />
          <IconFont onClick={() => changeMusic(1)} className={style.icon} type='icon-play-next' />
        </div>

        <div className={style.bottom}>
          <div className={style.curTime}>{parseSecondToTime(this.props.currentTime)}</div>
          <div style={{ margin: '0 15px', width: '300px' }}>
            <ProgressBar
              setPercent={this.setPercent}
              percent={this.props.progress}
              underPercent={this.props.bufferProgress}
              onChangeStart={() => this.props.setAdjust(true)}
              onChangeEnd={() => this.props.setAdjust(false)}
            />
          </div>
          <div className={style.totalTime}>{parseSecondToTime(this.props.duration)}</div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state: RootState) => ({
    ...state.musicControl,
    ...state.musicList
  }),
  (dispatch: any) => ({
    setCurTime: (curTime: number) => dispatch(musicControlSlice.actions.setCurrentTime(curTime)),
    setDuration: (duration: number) => dispatch(musicControlSlice.actions.setDuration(duration)),
    setIsPlay: (isPlay: boolean) => dispatch(musicControlSlice.actions.setIsPlaying(isPlay)),
    setProgress: (progress: number) => dispatch(musicControlSlice.actions.setProgress(progress)),
    setAdjust: (adjust: boolean) => dispatch(musicControlSlice.actions.setAujsting(adjust))
  })
)(MusicControl)
