import { useEffect, useState } from 'react'
import { getTopList } from '../service/api/rank'
import { ToplistType } from '../type/topListItem'

export const useTopList = () => {
  const [topList, setTopList] = useState<ToplistType[] | null>(null)
  const [detailTopList, setDetailTopList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    getTopList()
      .then((res) => {
        setTopList(res.list)
        setDetailTopList(res?.list?.slice(0, 4))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  return [topList, isLoading, detailTopList] as [ToplistType[], boolean, ToplistType[]]
}
