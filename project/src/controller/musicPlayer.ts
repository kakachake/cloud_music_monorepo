import Toast from '../components/Toast'
import { musicControlSlice } from '../redux/musicControl/slice'
import { Store } from '../redux/store'
import { changeMusic } from './musicControl'

export class AudioController {
  audio: HTMLAudioElement
  store: Store | undefined
  constructor() {
    this.audio = new Audio()
    this.audio.autoplay = false
  }
  init(store: Store) {
    this.store = store
    this.audio.src = this.store.getState().musicControl.musicInfo.url ?? ''

    this.audio.preload = 'auto'

    this.audio.volume = this.store.getState().musicControl.volume
    //时长
    this.audio.addEventListener('durationchange', () => {
      this.store?.dispatch(musicControlSlice.actions.setDuration(this.audio.duration))
    })
    //音量  进度
    this.audio.addEventListener('canplay', (e) => {
      this.store?.dispatch(musicControlSlice.actions.setCanPlay(true))
      if (this.store?.getState().musicControl.isPlaying) {
        this.play()
      }
    })

    // 时间更新
    this.audio.addEventListener('timeupdate', () => {
      if (!this.store?.getState().musicControl.isAdjusting) {
        this.store?.dispatch(musicControlSlice.actions.setCurrentTime(this.audio.currentTime))
        this.store?.dispatch(
          musicControlSlice.actions.setProgress(
            (this.audio.currentTime / this.audio.duration) * 100
          )
        )
        const timeRanges = this.audio.buffered
        if (timeRanges.length > 0) {
          this.store?.dispatch(
            musicControlSlice.actions.setBufferProgress(
              (timeRanges.end(timeRanges.length - 1) / this.audio.duration) * 100
            )
          )
        }
      }
    })

    this.audio.addEventListener('ended', () => {
      //TODO 播放完成,调用musicListSLice播放下一首
      changeMusic(1)
    })
  }
  setUrl(url: string) {
    this.audio.src = url
    // if (this.store?.getState().musicControl.isPlaying) {
    // this.play()
    // }
  }
  play() {
    this.audio
      .play()
      .then((e) => {
        console.log(e)

        this.store?.dispatch(musicControlSlice.actions.setIsPlaying(true))
      })
      .catch((err) => {
        console.log(err)
        Toast.error('歌曲播放失败')
        this.store?.dispatch(musicControlSlice.actions.setIsPlaying(false))
      })
      .finally(() => {
        // this.store?.dispatch(musicControlSlice.actions.setIsPlaying(true))
      })
  }
  pause() {
    this.audio.pause()
    this.store?.dispatch(musicControlSlice.actions.setIsPlaying(false))
  }
  togglePlay() {
    console.log(this.audio.paused)

    if (this.audio.paused) {
      this.play()
    } else {
      this.pause()
    }
  }
  setCurrentTime(time: number) {
    this.audio.currentTime = time
    this.store?.dispatch(musicControlSlice.actions.setCurrentTime(time))
  }
  setVolume(volume: number) {
    if (volume === 0) {
      this.store?.dispatch(musicControlSlice.actions.setIsMute(true))
    } else {
      this.store?.dispatch(musicControlSlice.actions.setIsMute(false))
      this.store?.dispatch(musicControlSlice.actions.setVolume(volume))
    }
    this.audio.volume = volume
  }
  toggleVolume() {
    if (this.audio.volume === 0) {
      this.setVolume(this.store?.getState().musicControl.volume ?? 0.5)
    } else {
      this.setVolume(0)
    }
  }
  clearCurMusic() {
    this.audio.src = ''
    this.store?.dispatch(musicControlSlice.actions.clearMusicInfo())
  }
}

const audioInstance = new AudioController()

export default audioInstance
