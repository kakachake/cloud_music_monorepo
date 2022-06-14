import { useCallback, useEffect, useRef, useState } from 'react'

export const useVideo = () => {
  const [percent, setPercent] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ismuted, setIsmuted] = useState(false)
  const [volume, setVolume] = useState(50)
  const isAdjust = useRef(false)
  const [bufferProgress, setBufferProgress] = useState(0)
  const videoEl = useRef<HTMLVideoElement | null>(null)

  const onChangePercent = useCallback(
    (per: number) => {
      setPercent(per)
      setCurrentTime((per / 100) * duration)
      console.log(duration)

      if (!isAdjust.current && videoEl.current) {
        videoEl.current.currentTime = (per / 100) * duration
      }
    },
    [duration]
  )

  const handleTogglePlay = () => {
    if (isPlaying) {
      videoEl.current?.pause()
    } else {
      videoEl.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleToggleMute = (mute?: boolean) => {
    if (videoEl.current) {
      if (mute != undefined) {
        videoEl.current.muted = mute
        setIsmuted(mute)
        return
      }
      videoEl.current.muted = !videoEl.current.muted

      setIsmuted(videoEl.current.muted)
    }
  }

  const listenTimeupdate = () => {
    if (videoEl.current && !isAdjust.current) {
      const { current } = videoEl
      const { duration, currentTime } = current
      const timeRanges = current.buffered
      if (timeRanges.length > 0) {
        setBufferProgress((timeRanges.end(timeRanges.length - 1) / duration) * 100)
      }
      if (isNaN(duration) || isNaN(currentTime)) return
      const percent = duration === 0 ? 0 : currentTime / duration

      setPercent(percent * 100)
      setCurrentTime(currentTime)
      setDuration(duration)
    }
  }

  const onWating = () => {
    setLoading(true)
  }

  const onPlaying = () => {
    setLoading(false)
  }

  const handleSetVolume = (volume: number) => {
    if (videoEl.current) {
      if (volume > 0) {
        videoEl.current.volume = volume / 100
        setVolume(volume)
        handleToggleMute(false)
      } else {
        handleToggleMute(true)
      }
    }
  }

  const onHandleCanPlay = useCallback(() => {
    if (videoEl.current) {
      setLoading(false)
      const { current } = videoEl
      const { duration, currentTime } = current
      console.log(duration)
      const percent = currentTime / duration

      if (isPlaying) {
        console.log(111)

        current.play()
      }
      setPercent(percent * 100)
      setCurrentTime(currentTime)
      setDuration(duration)
    }
  }, [isPlaying])

  const listenVolumeupdate = (e: any) => {
    console.log(e)
  }

  const onPlay = () => {
    setIsPlaying(true)
  }

  const onPause = () => {
    setIsPlaying(false)
  }

  const onLoadstart = () => {
    setLoading(true)
  }

  useEffect(() => {
    videoEl.current = document.querySelector('video')
    if (videoEl.current) {
      videoEl.current.addEventListener('canplay', onHandleCanPlay)
      videoEl.current.addEventListener('volumechange', listenVolumeupdate)
      videoEl.current.addEventListener('play', onPlay)
      videoEl.current.addEventListener('pause', onPause)
      videoEl.current.addEventListener('waiting', onWating)
      videoEl.current.addEventListener('playing', onPlaying)
      videoEl.current.addEventListener('loadstart', onLoadstart)
      videoEl.current.addEventListener('timeupdate', listenTimeupdate)
      videoEl.current.volume = volume / 100
    }
    return () => {
      if (videoEl.current) {
        videoEl.current.removeEventListener('canplay', onHandleCanPlay)
        videoEl.current.removeEventListener('volumechange', listenVolumeupdate)
        videoEl.current.removeEventListener('play', onPlay)
        videoEl.current.removeEventListener('pause', onPause)
        videoEl.current.removeEventListener('waiting', onWating)
        videoEl.current.removeEventListener('playing', onPlaying)
        videoEl.current.removeEventListener('loadstart', onLoadstart)
        videoEl.current.removeEventListener('timeupdate', listenTimeupdate)
      }
    }
  }, [onHandleCanPlay, listenTimeupdate, onChangePercent])
  return [
    videoEl,
    {
      percent,
      currentTime,
      duration,
      isPlaying,
      isAdjust,
      bufferProgress,
      onChangePercent,
      handleTogglePlay,
      loading,
      handleSetVolume,
      handleToggleMute,
      ismuted,
      volume
    }
  ] as [
    React.MutableRefObject<HTMLVideoElement | null>,
    {
      percent: number
      currentTime: number
      duration: number
      isPlaying: boolean
      isAdjust: React.MutableRefObject<boolean>
      bufferProgress: number
      onChangePercent: (per: number) => void
      handleTogglePlay: () => void
      loading: boolean
      handleSetVolume: (volume: number) => void
      handleToggleMute: (mute?: boolean) => void
      ismuted: boolean
      volume: number
    }
  ]
}
