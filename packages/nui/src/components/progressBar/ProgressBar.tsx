import React, { FunctionComponent, useEffect, useState } from 'react'
import style from './ProgressBar.module.css'
import styled from 'styled-components'

interface ProgressBarProps {
  percent: number
  underPercent?: number
  setPercent: (percent: number) => void
  onChangeStart?: () => void
  onChangeing?: () => void
  onChangeEnd?: () => void
  height?: number
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  percent,
  setPercent,
  onChangeStart,
  onChangeing,
  onChangeEnd,
  underPercent = 0,
  height = 5
}) => {
  const [random, setRandom] = useState<string>()
  useEffect(() => {
    //生成四位随机字符串
    const random = Math.random().toString(36)
    setRandom(random)
  }, [])
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const left = e.clientX - e.currentTarget.getBoundingClientRect().left
    const percent = left / e.currentTarget.offsetWidth
    setPercent(percent * 100)
  }

  const setBarPercent = (
    e: React.MouseEvent<HTMLDivElement>,
    barEl: HTMLElement,
    direction: 'row' | 'column' = 'row'
  ) => {
    onChangeStart && onChangeStart()
    const length = direction === 'row' ? barEl!.offsetWidth : barEl!.offsetHeight
    const dotWidth = e.currentTarget.offsetWidth
    const offset =
      direction === 'row'
        ? e.clientX - e.currentTarget?.offsetLeft
        : e.clientY - e.currentTarget?.offsetTop
    const _mouseMoveHandler = (e: any) => {
      onChangeing && onChangeing()
      //鼠标距离左边的距离
      const curLength =
        direction === 'row' ? e.clientX - offset + dotWidth : e.clientY - offset + dotWidth

      let percent = direction === 'row' ? curLength / length : (length - curLength) / length

      percent = percent > 1 ? 1 : percent < 0 ? 0 : percent
      setPercent(percent * 100)
    }
    window.addEventListener('mousemove', _mouseMoveHandler)
    window.addEventListener('mouseup', () => {
      // this.props.setAdjust(false)
      onChangeEnd && onChangeEnd()
      window.removeEventListener('mousemove', _mouseMoveHandler)
    })
  }
  const handleMouseDownDot = (e: React.MouseEvent<HTMLDivElement>) => {
    const barEl = document.getElementById('progressBar' + random)
    setBarPercent(e, barEl!)
  }
  return (
    <div id={'progressBar' + random} onClick={handleClick} className={style.progress}>
      <ProgressBarStyle height={height} className={style.progressBar}>
        <div style={{ width: `${percent}%` }} className={style.curBar}>
          <div onMouseDown={handleMouseDownDot} className={style.dot}></div>
        </div>
        {underPercent > 0 && (
          <div style={{ width: `${underPercent}%` }} className={style.bufferBar}></div>
        )}
      </ProgressBarStyle>
    </div>
  )
}

export default ProgressBar

const ProgressBarStyle = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
`
