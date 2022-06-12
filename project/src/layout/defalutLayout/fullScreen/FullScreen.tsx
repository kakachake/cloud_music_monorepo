import { FC, useEffect, useState } from 'react'
import { Changpian } from '@cloud_music/nui'
import { useSelector } from '../../../redux/hooks'
import { parseLrc } from '../../../utils'
import style from './FullScreen.module.css'
import styled from 'styled-components'
import { Lyric } from '@cloud_music/nui'
import MusicBar from '../musicBar/MusicBar'
import { CheckOutlined } from '@ant-design/icons'
import audioInstance from '../../../controller/musicPlayer'
interface FullScreenProps {}

enum Mode {
  defalut, //标准
  lyric, //歌词
  cover //封面
}

const FullScreen: FC<FullScreenProps> = () => {
  const currentTime = useSelector((state) => state.musicControl.currentTime)
  const isPlaying = useSelector((state) => state.musicControl.isPlaying)
  const { song, lyric } = useSelector((state) => state.musicControl.musicInfo)
  const [mode, setMode] = useState<Mode>(Mode.defalut)

  const [parsedLrc, setParseLrc] = useState<any[]>([])

  // useEffect(() => {}, [lyric])
  const musicDetailEl = document.getElementById('musicDetail')
  useEffect(() => {
    lyric != '' && setParseLrc(parseLrc(lyric))
    musicDetailEl?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [song])
  return (
    <div className={style.fullScreen}>
      <FullScreenWrap bg={song?.al?.picUrl}></FullScreenWrap>
      <div className={style.changeMode}>
        <div
          onClick={() => setMode(Mode.defalut)}
          className={`${style.modeItem} ${mode === Mode.defalut ? style.modeActive : ''}`}
        >
          标准模式
          {mode === Mode.defalut && <CheckOutlined />}
        </div>
        <div
          onClick={() => setMode(Mode.lyric)}
          className={`${style.modeItem} ${mode === Mode.lyric ? style.modeActive : ''}`}
        >
          歌词模式
          {mode === Mode.lyric && <CheckOutlined />}
        </div>
        <div
          onClick={() => setMode(Mode.cover)}
          className={`${style.modeItem} ${mode === Mode.cover ? style.modeActive : ''}`}
        >
          封面模式
          {mode === Mode.cover && <CheckOutlined />}
        </div>
      </div>
      <div className={style.cover}>
        {mode === Mode.lyric ? (
          <></>
        ) : (
          <div
            style={mode === Mode.cover ? { transform: 'scale(1.3)' } : {}}
            className={`${style.songPicWrap} `}
          >
            <Changpian isPlaying={isPlaying} songPicUrl={song?.al?.picUrl} />
          </div>
        )}
      </div>
      <>
        {mode === Mode.cover ? (
          <></>
        ) : (
          <div className={style.lyric}>
            <div className={style.songName}>{song.name}</div>
            <Lyric
              control={audioInstance}
              height={mode === Mode.lyric ? 500 : 200}
              itemFontSize={22}
              itemHeight={40}
              showControl={false}
              mode='white'
              lrc={parsedLrc}
              currentTime={currentTime}
              _uid='fullScreenPage'
            />
          </div>
        )}
      </>
      <div>
        <MusicBar id='fullScreen' mode='white' showBorder={false} />
      </div>
    </div>
  )
}

export default FullScreen

const FullScreenWrap = styled.div<{ bg: string }>`
  background-image: ${(props) => `url(${props.bg})`};
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(1.2);
  filter: blur(80px) brightness(0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
