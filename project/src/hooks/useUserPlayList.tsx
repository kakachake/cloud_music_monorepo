import { useEffect, useState } from 'react'
import store from '../redux/store'
import { getUserPlayList } from '../service/api/login'
import { filterPlayList } from '../service/utils'

export const useUserPlayList = (id: string) => {
  const [loading, setLoading] = useState(false)
  const { userPlayList: ownList, userLikeList: likeList } = store.getState().user

  return [ownList, likeList, loading] as const
}
