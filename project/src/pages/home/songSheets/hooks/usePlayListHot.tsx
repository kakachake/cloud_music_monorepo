import { useEffect, useState } from 'react'
import { getHotSongSheetsCategory } from '../../../../service/api/music'

export const useSongsheetsCategory = () => {
  const [songSheetsCategory, setSongSheetsCategory] = useState<any[]>([])
  useEffect(() => {
    getHotSongSheetsCategory().then((res) => {
      setSongSheetsCategory(res.tags)
    })
  }, [])
  return { songSheetsCategory }
}
