import { ArrowsAltOutlined, LoadingOutlined, ShrinkOutlined } from '@ant-design/icons'

import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { IconFont } from '../../assets/css/iconFont'
import { useClick } from '../../hooks/useClick'
import { useFullScreen } from '../../hooks/useFullScreen'
import { parseSecondToTime } from '../../utils'
import { enterFullScreen, exitFullScreen, isFullScreen } from '../../utils/fullScreen'
import ProgressBar from '../progressBar/ProgressBar'
import { useVideo } from './useVideo'
import style from './VideoPlayer.module.css'
interface VideoPlayerProps {
  width?: number
  height?: number
  src?: string
  urls?: {
    url: string
    type: string
    id: string
    br: string
  }[]
  defaultId?: string | number
  poster?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  playsinline?: boolean
  preload?: 'auto' | 'metadata' | 'none'
  onCanPlay?: () => void
  onCanPlayThrough?: () => void
  onEnded?: () => void
  onError?: () => void
  onPause?: () => void
  onPlay?: () => void
  onPlaying?: () => void
  onSeeked?: () => void
  onSeeking?: () => void
  onStalled?: () => void
  onWaiting?: () => void
}

const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const {
    width = '100%',
    height = '100%',
    src,
    urls,
    defaultId,
    poster,
    controls = true,
    autoplay = false,
    loop = false,
    muted = false,
    playsinline = true,
    preload = 'auto',
    onCanPlay,
    onCanPlayThrough,
    onEnded,
    onError,
    onPause,
    onPlay,
    onPlaying,
    onSeeked,
    onSeeking,
    onStalled,
    onWaiting
  } = props
  const [videoBrs, setVideoBrs] = useState(urls)
  const [activeBr, setActiveBr] = useState<any>()
  useEffect(() => {
    if (urls) {
      setVideoBrs(urls)
      setActiveBr(urls?.find((item) => item.id == defaultId) || urls?.[0])
    }
  }, [urls])
  const [
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
  ] = useVideo()

  const videoPlayEl = useRef<HTMLElement | null>(null)

  const keyDown = (e: any) => {
    if (e.keyCode === 32) {
      e.preventDefault()
      console.log(211)
      handleClick()
    }
  }

  useEffect(() => {
    videoPlayEl.current = document.getElementById('videoPlayer')
    if (videoPlayEl.current) {
      document.addEventListener('keydown', keyDown)
    }
    return () => {
      document.removeEventListener('keydown', keyDown)
    }
  }, [handleTogglePlay])

  useLayoutEffect(() => {
    if (videoEl.current) {
      videoEl.current.src = activeBr.url
      onChangePercent(percent)
    }
  }, [activeBr])

  const [isFull] = useFullScreen()

  const handleFullScreen = () => {
    if (isFullScreen()) {
      exitFullScreen()
    } else {
      enterFullScreen(videoPlayEl.current)
    }
  }

  const [handleClick, fullScreen] = useClick(
    { clickFn: handleTogglePlay, doubleFn: handleFullScreen },
    300
  )

  return (
    <VideoPlayerWrapper
      id='videoPlayer'
      className={style.videoWrapper}
      width={width}
      height={height}
    >
      <div className={style.video}>
        <video
          autoPlay={autoplay}
          onClick={handleClick}
          onDoubleClick={fullScreen}
          id='videoPlay'
        ></video>
      </div>
      <div className={style.layerIcon}>
        <CSSTransition in={loading} unmountOnExit timeout={500} classNames='fade'>
          <LoadingOutlined />
        </CSSTransition>
      </div>
      <div className={style.videoControl}>
        <div className={style.controlTop}>
          <ProgressBar
            onChangeStart={() => {
              isAdjust.current = true
            }}
            onChangeEnd={() => {
              isAdjust.current = false
            }}
            percent={percent}
            underPercent={bufferProgress}
            setPercent={(number) => onChangePercent(number)}
          />
        </div>
        <div className={style.controlBottom}>
          <div className={style.left}>
            <div>
              <IconFont
                className={`${style.playIcon} ${style.icon}`}
                onClick={handleTogglePlay}
                type={isPlaying ? 'icon-pause' : 'icon-play'}
              />
            </div>
            <div className={style.time}>
              <span>{parseSecondToTime(currentTime)}</span> /{' '}
              <span>{parseSecondToTime(duration)}</span>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.volume}>
              <IconFont
                onClick={() => handleToggleMute()}
                className={style.icon}
                type={`${ismuted ? 'icon-sound-off' : 'icon-sound-on'}`}
              />
              <div className={style.volumeBar}>
                <ProgressBar
                  percent={ismuted ? 0 : volume}
                  setPercent={(number) => handleSetVolume(number)}
                />
              </div>
            </div>
            <div className={style.selectBr}>
              <div className={style.selectBrTitle}>
                <span>{activeBr?.type}</span>
              </div>
              <div className={style.selectList}>
                {videoBrs?.map((item) => (
                  <span
                    key={item.id}
                    className={`${style.selectItem} ${
                      item.id == activeBr?.id ? style.activeBr : ''
                    }`}
                    onClick={() => {
                      setActiveBr(item)
                    }}
                  >
                    {item.type}
                  </span>
                ))}
              </div>
            </div>
            <div onClick={fullScreen} className={style.fullscreen}>
              {isFull ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
            </div>
          </div>
        </div>
      </div>
    </VideoPlayerWrapper>
  )
}

export default VideoPlayer

const VideoPlayerWrapper = styled.div<{
  width: number | string
  height: number | string
}>`
  width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
  height: ${(props) => (typeof props.height === 'number' ? `${props.height}px` : props.height)};
`
