import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import Toast from '../../components/Toast'
import { useListControl } from '../../controller/listController'
import { getMusicById } from '../../controller/musicControl'
import musicInstance from '../../controller/musicPlayer'
import { getSongComment, getSongLyric, getSongUrl } from '../../service/api/music'
import { musicListSlice } from '../musicList/slice'
import store from '../store'

export const getSongInfoAndSet = createAsyncThunk(
  'musicControl/getSongInfoAndSet',
  async ({ song, needPlay = true }: { song: any; needPlay?: boolean }) => {
    try {
      store.dispatch(musicControlSlice.actions.clearMusicInfo())
      const res = await Promise.allSettled([getSongLyric(song.id), getSongUrl(song.id)])
      const [lyric, url] = res.map((item: any) => item.value)
      if (lyric.code === 200 && url.code === 200) {
        if (url.data[0].url === null) {
          Toast.error('歌曲暂无歌源')
          needPlay = false
        }
        return {
          song,
          lyric: lyric.lrc.lyric,
          url: url.data[0].url,
          needPlay
        }
      } else {
        Toast.error('获取歌曲信息失败')
        return {
          song,
          lyric: '',
          url: ''
        }
      }
    } catch (error) {
      Toast.error('获取歌曲信息失败')
    }
  }
)

export interface MusicControlState {
  isPlaying: boolean
  isLoading: boolean
  isError: boolean
  error: string | null
  currentTime: number
  duration: number
  progress: number
  volume: number
  musicInfo: {
    song: any
    lyric: any
    url: string
  }
  canplay: boolean
  isAdjusting: boolean
  bufferProgress: number
  isMute: boolean
}

const initialState: MusicControlState = {
  isPlaying: false,
  isLoading: false,
  isError: false,
  error: null,
  currentTime: 0, //当前播放时间
  duration: 0, //时长,
  volume: 0.5,
  progress: 0,
  musicInfo: {
    song: {},
    lyric: '',
    url: ''
  },
  canplay: false,
  //正在调整
  isAdjusting: false,
  bufferProgress: 0,
  //静音
  isMute: false
}

export const musicControlSlice = createSlice({
  name: 'musicControl',
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    },
    setCanPlay: (state, action: PayloadAction<boolean>) => {
      state.canplay = action.payload
    },
    setAujsting: (state, action: PayloadAction<boolean>) => {
      state.isAdjusting = action.payload
    },
    setBufferProgress: (state, action: PayloadAction<number>) => {
      state.bufferProgress = action.payload
    },
    //TODO: 通过音乐ID获取音乐信息并设置，同时给播放器设置url
    setMusicInfo: (state, action: PayloadAction<any>) => {
      state.musicInfo = action.payload
      musicInstance.setUrl(action.payload.url)
    },
    setIsMute: (state, action: PayloadAction<boolean>) => {
      state.isMute = action.payload
    },
    clearMusicInfo: (state) => {
      state.musicInfo = {
        song: {},
        lyric: '',

        url: ''
      }
      state.progress = 0
      state.currentTime = 0
      state.duration = 0
      state.bufferProgress = 0
    },
    clearPlayStatus: (state) => {
      state.isPlaying = false
      state.progress = 0
      state.currentTime = 0
      state.duration = 0
      state.bufferProgress = 0
    }
  },
  extraReducers: {
    [getSongInfoAndSet.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.musicInfo.song = action.payload.song
      state.musicInfo.lyric = action.payload.lyric
      state.musicInfo.url = action.payload.url
      musicInstance.setUrl(action.payload.url)
      if (action.payload.needPlay) {
        musicInstance.play()
      } else {
        state.isPlaying = false
        state.progress = 0
        state.currentTime = 0
        state.duration = 0
        state.bufferProgress = 0
      }
    }
  }
})
