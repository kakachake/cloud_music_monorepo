import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export function useIsLiked() {
  const likeIdList = useSelector((state: any) => state.user.likeIdList)

  return useMemo(() => {
    return (id: string | number) => likeIdList.indexOf(id) !== -1
  }, [likeIdList])
}
