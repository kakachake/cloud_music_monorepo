import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import Toast from '../../components/Toast'
import { checkLoginStatus } from '../../service/api/login'
import store from '../store'

type SideType = 'playList' | 'message' | ''

interface PublicState {
  curSideOpen: SideType
  songDetailOpen: boolean
  curListType: 'musicList' | 'fmList'
  searchHistory: string[]
}

const initialState: PublicState = {
  curSideOpen: '',
  songDetailOpen: false,
  curListType: 'musicList',
  searchHistory: []
}

export const publicSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setCurSideOpen(state, action: PayloadAction<SideType>) {
      if (state.curSideOpen === action.payload) {
        state.curSideOpen = ''
      } else {
        state.curSideOpen = action.payload
      }
    },
    setSongDetailOpen(state, action: PayloadAction<boolean>) {
      state.songDetailOpen = action.payload
    },
    setCurListType(state, action: PayloadAction<'musicList' | 'fmList'>) {
      state.curListType = action.payload
    },
    setSearchHistory(state, action: PayloadAction<string>) {
      state.searchHistory = [
        action.payload,
        ...state.searchHistory.filter((item) => item !== action.payload)
      ]
    }
  }
})

if (!import.meta.env.SSR) {
  window.addEventListener('click', (e: any) => {
    //查询是否点击到了侧边栏
    const sideBar = document.querySelector('#rightSideBar')
    const musicBar = document.querySelector('#musicBar')
    if (e.path.includes(sideBar) || e.path.includes(musicBar)) {
    } else {
      store.dispatch(publicSlice.actions.setCurSideOpen(''))
    }
  })
}
