import React from 'react'
import { connect } from 'react-redux'
import { musicControlSlice, MusicControlState } from '../../redux/musicControl/slice'
import { RootState } from '../../redux/store'
import style from './VolumeControl.module.css'
import audioInstance from '../../controller/musicPlayer'
interface VolumeControlProps extends MusicControlState {
  setVolume: (adjust: number) => void
  id?: string
}

interface VolumeControlState {}

class VolumeControl extends React.Component<VolumeControlProps, VolumeControlState> {
  handlePgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //鼠标距离底部的距离

    const bottom = e.currentTarget.getBoundingClientRect().bottom - e.clientY

    const percent = bottom / e.currentTarget.offsetHeight

    this.setVolume(percent)
  }
  setVolume(percent: number) {
    audioInstance.setVolume(percent)
  }
  handleMouseDownDot = (e: React.MouseEvent<HTMLDivElement>) => {
    const barEl = document.getElementById('volumeBar' + this.props.id)
    const curBarEl = document.getElementById('curVolumeBar' + this.props.id)
    this.setBarPercent(e, barEl!, curBarEl!, 'column', (percent: number) => {
      this.setVolume(percent)
    })
  }
  setBarPercent = (
    e: React.MouseEvent<HTMLDivElement>,
    barEl: HTMLElement,
    curBarEl: HTMLElement,
    direction: 'row' | 'column' = 'row',
    setPercent: (percent: number) => void
  ) => {
    const length = direction === 'row' ? barEl!.offsetWidth : barEl!.offsetHeight
    const curLength = direction === 'row' ? curBarEl!.offsetWidth : curBarEl!.offsetHeight

    const offset = direction === 'row' ? e.clientX - curLength : e.clientY + curLength - length

    const _mouseMoveHandler = (e: any) => {
      const curLength = direction === 'row' ? e.clientX - offset : e.clientY - offset

      let percent = direction === 'row' ? curLength / length : (length - curLength) / length

      percent = percent > 1 ? 1 : percent < 0 ? 0 : percent
      setPercent(percent)
    }
    window.addEventListener('mousemove', _mouseMoveHandler)
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', _mouseMoveHandler)
    })
  }
  render() {
    return (
      <div className={style.volumeControl}>
        <div
          id={'volumeBar' + this.props.id}
          onClick={this.handlePgClick}
          className={style.progress}
        >
          <div className={style.progressBar}>
            <div
              id={'curVolumeBar' + this.props.id}
              style={{ height: `${this.props.isMute === true ? 0 : this.props.volume * 100}%` }}
              className={style.curBar}
            >
              <div onMouseDown={this.handleMouseDownDot} className={style.dot}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  (state: RootState) => ({
    ...state.musicControl
  }),
  (dispatch: any) => ({
    setVolume: (volume: number) => dispatch(musicControlSlice.actions.setVolume(volume))
  })
)(VolumeControl)
