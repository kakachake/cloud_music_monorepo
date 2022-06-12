import { off } from 'process'
import { getSongInfoAndSet, musicControlSlice } from '../redux/musicControl/slice'
import { musicListSlice } from '../redux/musicList/slice'
import { publicSlice } from '../redux/publicSlice/slice'
import store from '../redux/store'
import { getSongDetail } from '../service/api/music'
import { debounce, throttle } from '../utils'
import { useListControl } from './listController'
import audioInstance from './musicPlayer'

//切换上下一首音乐
export const changeMusic = debounce((direction: number, needPlay = true) => {
  const listControl = useListControl()
  const { list, current } = listControl.getList()
  if (list.length === 0) return
  const newIndex = (list.length + current + direction) % list.length
  audioInstance.clearCurMusic()
  listControl.curListType !== 'fmList' &&
    store.dispatch(
      getSongInfoAndSet({
        song: list[newIndex],
        needPlay
      })
    ) &&
    listControl.setCurrent(newIndex)
  //fmlist需要特殊处理
  listControl.curListType === 'fmList' && getSongBaseInfoAndSet(list[newIndex].id)
  // store.dispatch(getSongInfoAndSet(list[newIndex]))
}, 500)

//对于歌曲信息不完全的，使用这个函数先获取歌曲详情，再加入列表
export const getSongBaseInfoAndSet = (id: number) => {
  getSongDetail(id).then((res) => {
    const song = res.songs?.[0]

    song && addMusic(song)
  })
}

export const setMusicList = (payload: any[], type: 'musicList' | 'fmList') => {
  const listControl = useListControl()
  listControl.setList(payload, type)

  changeMusic(0)
}

//新增一首音乐
export const addMusic = async (data: any, options = { needPlay: true, needFetch: false }) => {
  const listControl = useListControl()
  const { current } = listControl.getList()

  const { idx } = getMusicById(data.id)
  if (idx == -1) {
    listControl.addSongToPlayList(data)
    store.dispatch(
      getSongInfoAndSet({
        song: data,
        needPlay: options.needPlay
      })
    )
    listControl.setCurrent(current + 1)
  } else {
    store.dispatch(
      getSongInfoAndSet({
        song: data,
        needPlay: options.needPlay
      })
    )
    listControl.setCurrent(idx)
  }
}

export const getMusicById = (id: string) => {
  const listControl = useListControl()
  const { list } = listControl.getList()

  const idx = list.findIndex((item: any) => item.id === id)
  return { music: list[idx], idx }
}

export const clearPlayList = () => {
  const listControl = useListControl()
  store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  listControl.clearList()
  store.dispatch(musicControlSlice.actions.clearMusicInfo())

  audioInstance.setUrl('')
}
