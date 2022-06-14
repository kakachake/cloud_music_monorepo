import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import style from './Changpian.module.css'
import changzhen from '../../assets/img/changzhen.png'
interface ChangpianProps {
  isPlaying: boolean
  songPicUrl: string
}

const Changpian: FunctionComponent<ChangpianProps> = ({ isPlaying, songPicUrl }) => {
  return (
    <div className={`${style.songPicWrap} ${isPlaying ? style.changPianPlay : ''}`}>
      <div className={style.changZhen}>
        <img src={changzhen} alt='' />
      </div>
      <div className={`${style.changPian} `}>
        <div className={style.changPianWen}>
          <ChangPianWen idx={1} />
          <ChangPianWen idx={2} />
          <ChangPianWen idx={3} />
          <ChangPianWen idx={4} />
        </div>
        <div className={style.changPianInner}>
          <div className={style.changPianPic}>
            <img src={songPicUrl} alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Changpian

const ChangPianWen = styled.div<{ idx: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => `${240 - 10 * props.idx}px`};
  height: ${(props) => `${240 - 10 * props.idx}px`};

  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #292a2c;
`
