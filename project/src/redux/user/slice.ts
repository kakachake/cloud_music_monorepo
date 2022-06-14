import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import Toast from '../../components/Toast'
import { checkLoginStatus, getUserPlayList } from '../../service/api/login'
import { getLikeList } from '../../service/api/reqLoginApi/songSheets'
import { filterPlayList } from '../../service/utils'
import store from '../store'
import { UserAccountType, UserInfoType } from './userType'
interface UserState {
  userInfo: UserInfoType | null
  userAccount: UserAccountType | null
  userPlayList: any[]
  userLikeList: any[]
  likeIdList: any[]
}

export const getLList = createAsyncThunk('user/getLikeList', async (userId: string | number) => {
  const { ids } = await getLikeList(userId)

  return ids
})

export const getPlayList = createAsyncThunk('user/getUserList', async (userId: string) => {
  const { playlist } = await getUserPlayList(userId)

  return playlist
})

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const { data } = await checkLoginStatus()

  if (data.code === 200) {
    store.dispatch(getLList(data.profile.userId))
    store.dispatch(getPlayList(data.profile.userId))
    return data
  } else {
    Toast.error('获取用户信息失败')
  }
})

const initialState: UserState = {
  userInfo: null,
  userAccount: null,
  userPlayList: [],
  userLikeList: [],
  likeIdList: []
}

export const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload.profile
      state.userAccount = action.payload.account
    },
    [getPlayList.fulfilled.type]: (state, action: PayloadAction<any>) => {
      const { ownList, likeList } = filterPlayList(action.payload, state.userInfo?.userId)
      state.userPlayList = ownList
      state.userLikeList = likeList
    },
    [getLList.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.likeIdList = action.payload
    }
  }
})
