import { DashOutlined, DeleteOutlined, HeartOutlined, StepForwardOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import { getSongDetail } from '../../service/api/music'
import { getPersonalFm } from '../../service/api/reqLoginApi/songSheets'
import { AlbumType } from '../../type/album'
import SongImgChangeSwiper from '../component/songImgChangeSwriper/SongImgChangeSwiper'
import style from './PersonalFm.module.css'
import { changeMusic, setMusicList } from '../../controller/musicControl'
import { useSelector } from '../../redux/hooks'
import Lyric from '../../components/lyric/Lyric'
import { parseLrc } from '../../utils'
import store, { RootState } from '../../redux/store'
import CommentTabPage from '../component/commentTabPage/CommentTabPage'
import { fmListSlice } from '../../redux/fmList/slice'
import { publicSlice } from '../../redux/publicSlice/slice'
import { useListControl } from '../../controller/listController'
import Like from '../../components/like/Like'
import { useNavigate } from 'react-router-dom'
import ArNameItem from '../component/arNameItem/ArNameItem'
import { comment_type } from '../../service/api/comment'
export interface PersonalFmItem {
  album: AlbumType
  name: string
  id: number
}

interface PersonalFmProps {}

const PersonalFm: FC<PersonalFmProps> = () => {
  const { list: personalFmList, current } = useSelector((state: RootState) => state.fmList)
  const curListType = useSelector((state) => state.public.curListType)
  // const [personalFmList, setPersonalFmList] = useState<PersonalFmItem[] | []>([])
  // const [curIndex, setCurIndex] = useState<number>(0)
  const currentTime = useSelector((state: RootState) => state.musicControl.currentTime)
  const [parsedLrc, setParseLrc] = useState<any[]>([])
  const { song, lyric } = useSelector((state) => state.musicControl.musicInfo)
  const navigate = useNavigate()
  useEffect(() => {
    const listControl = useListControl()
    const { current } = listControl.getList()
    if (current === -1 || curListType !== 'fmList') {
      store.dispatch(publicSlice.actions.setCurListType('fmList'))
      getPersonalFm().then((res) => {
        // setPersonalFmList(res.data)
        setMusicList(res.data, 'fmList')
        // store.dispatch(fmListSlice.actions.setList(res.data))
      })
    }
  }, [])

  useEffect(() => {
    checkNeedFeachFm(current + 1)
  }, [personalFmList, current])
  useEffect(() => {
    lyric != '' && setParseLrc(parseLrc(lyric))
  }, [song])
  const handleChangIdx = () => {
    if (current === personalFmList.length - 1) {
      return
    }

    setCurIndex(1)
  }
  const setCurIndex = (idx: number) => {
    changeMusic(idx)
    // store.dispatch(fmListSlice.actions.setCurrent(idx))
  }
  const checkNeedFeachFm = (idx: number) => {
    if (idx === personalFmList.length - 1) {
      getPersonalFm().then((res) => {
        store.dispatch(fmListSlice.actions.setList(res.data))
      })
    }
  }
  const changePage = (idx: number) => {
    const mainContentEl = document.querySelector('#mainContent')
    const commentAreaTop = document.getElementById('commentArea')?.offsetTop

    mainContentEl?.scrollTo({ top: commentAreaTop, behavior: 'smooth' })
  }
  const deleteCur = () => {
    store.dispatch(fmListSlice.actions.delCurrent())

    changeMusic(0)
  }

  return (
    <div id='fmContainer' className={`baseContainer ${style.personFmWrap}`}>
      <div className={style.songArea}>
        <div className={style.songAreaLeft}>
          <div className={style.songImgChangeSwriper}>
            <SongImgChangeSwiper
              songList={personalFmList}
              curIndex={current}
              setCurIndex={setCurIndex}
            />
          </div>
          <div className={style.songImgHandle}>
            <div className={style.handleItem}>
              <Like id={song.id} />
            </div>
            <div onClick={deleteCur} className={style.handleItem}>
              <DeleteOutlined />
            </div>
            <div onClick={handleChangIdx} className={style.handleItem}>
              <StepForwardOutlined />
            </div>
            <div className={style.handleItem}>
              <DashOutlined />
            </div>
          </div>
        </div>
        <div className={style.songAreaRight}>
          <div className={style.songAreaRightHeader}>
            <div className={`${style.songName} line1`}>{song?.name}</div>
            <div className={style.songOther}>
              <div className='line1'>专辑：{song?.al?.name}</div>
              <div className='line1'>
                歌手：
                <ArNameItem artists={song?.ar} />
              </div>
            </div>
          </div>
          <div className={style.lrc}>
            <Lyric lrc={parsedLrc} currentTime={currentTime} _uid={'fmPage'} />
          </div>
        </div>
      </div>
      <div id='commentArea'>
        <CommentTabPage onPageChange={changePage} id={song?.id} type='Song' />
      </div>
    </div>
  )
}

export default PersonalFm
