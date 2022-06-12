import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MusicListState {
  list: any[]
  current: number
}

const initialState: MusicListState = {
  list: [],
  current: -1
}

export const musicListSlice = createSlice({
  name: 'musicList',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload
      state.current = 0
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload
    },
    addSongToPlayList: (state, action: PayloadAction<any>) => {
      state.list.splice(state.current + 1, 0, action.payload)
      state.current++
    },
    clearList: (state) => {
      state.list = []
      state.current = -1
    }
  }
})
