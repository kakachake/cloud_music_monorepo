import { useEffect, useState } from 'react'
import { getVideoCategoryList, getVideoTagList } from '../service/api/video'

export const useVideoGroupList = () => {
  const [groupList, setGroupList] = useState<[]>([])
  const [categoryList, setCategoryList] = useState<[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    Promise.allSettled([getVideoCategoryList(), getVideoTagList()])
      .then(([categoryList, tagList]) => {
        if (categoryList.status === 'fulfilled') {
          setCategoryList(categoryList.value?.data)
        }
        if (tagList.status === 'fulfilled') {
          setGroupList(tagList.value?.data)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return [groupList, categoryList, loading] as [any[], any[], boolean]
}
