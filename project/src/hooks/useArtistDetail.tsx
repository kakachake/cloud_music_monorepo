import { useEffect, useState } from 'react'
import { getArtistDesc } from '../service/api/artist'

export const useArtistDetail = (id = '') => {
  if (!id) return [{}, true]
  const [artist, setArtist] = useState<any>({} as any)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getArtistDesc(id)
      .then((res) => {
        setArtist(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])
  return [artist, loading] as [any, boolean]
}
