import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { FC, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import { IconFont } from '../../assets/css/iconFont'

import { parseLrc, parseSecondToTime } from '../../utils'
import Toast from '../Toast'
import style from './Lyric.module.css'

interface LyricProps {
  lrc: {
    lrc: string
    time: number
  }[]
  currentTime: number
  _uid: string
  mode?: 'white' | 'black'
  itemHeight?: number
  itemFontSize?: number
  showControl?: boolean
  height?: number
  control: {
    setCurrentTime: (time: number) => void
    play: () => void
  }
}

const Lyric: FC<LyricProps> = ({
  lrc: parsedLrc,
  currentTime,
  _uid,
  mode,
  itemHeight = 36,
  itemFontSize,
  showControl = true,
  height = 300,
  control
}) => {
  const [curLrcIdx, setCurLrcIdx] = useState(0)
  const lrcWrapEl = document.getElementById('lrcWrap' + _uid)
  const [stopScroll, setStopScroll] = useState(false)
  const [scrollIdx, setScrollIdx] = useState(0)
  const [timeOffset, setTimeOffset] = useState(0)

  useEffect(() => {
    for (let i = 0; i < parsedLrc.length; i++) {
      if (currentTime + timeOffset < parsedLrc[i].time) {
        const curIdx = i - 1 >= 0 ? i - 1 : 0
        setCurLrcIdx(curIdx)

        //设置scroll
        if (lrcWrapEl && !stopScroll) {
          lrcWrapEl.scrollTo({
            top: (curIdx + 1) * itemHeight - itemHeight / 2,
            behavior: 'smooth'
          })
        }
        break
      }
    }
  }, [currentTime])
  useEffect(() => {
    setTimeOffset(0)
  }, [parsedLrc])
  const wheelEvent = (e: any) => {
    const scrollTop = lrcWrapEl!.scrollTop
    let idx = +((scrollTop + itemHeight / 2) / itemHeight).toFixed(0)
    if (idx >= parsedLrc.length) {
      idx = parsedLrc.length - 1
    }

    setScrollIdx(idx - 1)
  }
  const handleToTime = () => {
    const selectTime = parsedLrc[scrollIdx].time
    control.setCurrentTime(selectTime)
    control.play()
  }
  const handleChangeOffset = (e: any) => {
    const newTimeOffset = timeOffset + e
    setTimeOffset(newTimeOffset)
    Toast.success((newTimeOffset >= 0 ? '+' : '') + newTimeOffset + 's')
  }
  return (
    <div
      onMouseEnter={() => setStopScroll(true)}
      onMouseLeave={() => setStopScroll(false)}
      className={`${style.lrcContainer} ${mode === 'white' ? style.white : style.black}`}
    >
      {showControl ? (
        <div className={style.timeOffsetWrap}>
          <div onClick={() => handleChangeOffset(-0.5)} className={style.lrcTimeUp}>
            <UpOutlined />
          </div>
          <div onClick={() => handleChangeOffset(0.5)} className={style.lrcTimeDown}>
            <DownOutlined />
          </div>
        </div>
      ) : (
        ''
      )}
      {showControl ? (
        <div className={`${style.centerLine} ${stopScroll ? style.lineShow : ''}`}>
          <div className={style.leftLine}>
            <div className={style.leftTime}>{parseSecondToTime(parsedLrc?.[scrollIdx]?.time)}</div>
          </div>
          <div className={style.rightLine}>
            <div className={style.rightPlay}>
              <IconFont
                className={`${style.playIcon} ${style.icon}`}
                onClick={() => handleToTime()}
                type={'icon-play'}
              />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <LrcWrap
        height={height}
        id={'lrcWrap' + _uid}
        className={style.lrcWrap}
        onScroll={wheelEvent}
      >
        <LrcContent padding={height / 2} className={style.lrcContent}>
          {parsedLrc.map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  ...(itemHeight ? { height: itemHeight + 'px' } : {}),
                  ...(itemFontSize ? { fontSize: itemFontSize + 'px' } : {}),
                  ...(idx === curLrcIdx && itemFontSize
                    ? { fontSize: itemFontSize + 10 + 'px' }
                    : {})
                }}
                className={`${idx === curLrcIdx ? style.lrcActive : ''} ${style.lrcItem} line1`}
              >
                {item.lrc}
              </div>
            )
          })}
        </LrcContent>
      </LrcWrap>
    </div>
  )
}

export default Lyric

const LrcWrap = styled.div<{ height: number }>`
  height: ${(props) => props.height + 'px'};
`
const LrcContent = styled.div<{ padding: number }>`
  padding: ${(props) => props.padding + 'px'} 0;
`
