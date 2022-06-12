import { useEffect, useState } from 'react'
import { getMVVideoNew } from '../service/api/video'
import { MVType } from '../type/mv'

export const useMVFirstList = (type: string) => {
  const [mvFirst, setMvFirst] = useState<MVType[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getMVVideoNew(type)
      .then((res: any) => {
        setMvFirst(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [type])
  return [mvFirst, loading] as [MVType[], boolean]
}
