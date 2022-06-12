import { useEffect, useState } from 'react'
import store from '../redux/store'
import { getUserPlayList } from '../service/api/login'
import { filterPlayList } from '../service/utils'

export const useUserPlayList = (id: string) => {
  const [ownList, setOwnList] = useState<any[]>([])
  const [likeList, setLikeList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getUserPlayList(id)
      .then((res) => {
        const { ownList, likeList } = filterPlayList(res.playlist, id)
        setOwnList(ownList)
        setLikeList(likeList)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])
  return [ownList, likeList, loading] as const
}
