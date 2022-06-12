import { useEffect, useState } from 'react'

import { getPlaylistDetail } from '../service/api/music'

import { SongSheetType } from '../type/songSheet'

export const useSongSheet = (id: number) => {
  const [songSheetInfo, setSongSheetInfo] = useState<SongSheetType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    getPlaylistDetail(id!)
      .then((res) => {
        setSongSheetInfo(res.playlist)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])
  return [songSheetInfo, isLoading] as [SongSheetType, boolean]
}
