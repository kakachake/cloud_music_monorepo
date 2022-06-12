import { useState } from 'react'
import { getSearchSuggest } from '../service/api/search'

export enum SearchSuggestType {
  songs = '歌曲',
  artists = '歌手',
  albums = '专辑',
  playlists = '歌单',
  userprofiles = '用户'
}

export const useSearchSuggest = () => {
  const [searchSuggest, setSearchSuggest] = useState<{
    data: any
    order: (keyof typeof SearchSuggestType)[]
  }>()
  const [loading, setLoading] = useState(false)
  const handleSearchSuggest = (keyword: string) => {
    // setSearchSuggest({
    //   data: {},
    //   order: []
    // })
    setLoading(true)
    getSearchSuggest(keyword)
      .then((res) => {
        const result = res.result
        const obj: {
          [key: string]: any
        } = {}
        result.order.forEach((key: string) => {
          obj[key] = result[key]
        })
        setSearchSuggest({
          data: obj,
          order: result.order
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return [searchSuggest, handleSearchSuggest, loading] as [
    {
      data: any
      order: (keyof typeof SearchSuggestType)[]
    },
    (keyword: string) => void,
    boolean
  ]
}
