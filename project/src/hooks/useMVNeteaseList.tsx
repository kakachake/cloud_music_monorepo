import { useEffect, useState } from 'react'
import { getMVVideoNetease } from '../service/api/video'
import { MVType } from '../type/mv'

export const useMVNeteaseList = (type: string) => {
  const [mvNetease, setMvNetease] = useState<MVType[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getMVVideoNetease(type)
      .then((res: any) => {
        setMvNetease(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [type])
  return [mvNetease, loading] as [MVType[], boolean]
}
