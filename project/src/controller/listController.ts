import { musicListSlice } from '../redux/musicList/slice'
import store from '../redux/store'
import { fmListSlice } from '../redux/fmList/slice'
import { publicSlice } from '../redux/publicSlice/slice'

const slice = {
  musicList: musicListSlice,
  fmList: fmListSlice
}

export const useListControl = () => {
  let curListType = store.getState().public.curListType as 'fmList' | 'musicList'
  return {
    setList: (payload: any[], listType: 'fmList' | 'musicList') => {
      store.dispatch(publicSlice.actions.setCurListType(listType))
      store.dispatch(slice[listType].actions.setList(payload))
      curListType = listType
    },
    setCurrent: (payload: number) => {
      store.dispatch(slice[curListType].actions.setCurrent(payload))
    },
    clearList: () => {
      store.dispatch(slice[curListType].actions.clearList())
    },
    getList: () => {
      return store.getState()[curListType]
    },
    addSongToPlayList: (payload: any, idx?: number) => {
      store.dispatch(slice[curListType].actions.addSongToPlayList(payload))
    },
    curListType
  }
}
