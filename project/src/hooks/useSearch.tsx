import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getSearchResult, SEARCH_TYPE } from '../service/api/search'

export const useSearch = (type: SEARCH_TYPE, limit = 20) => {
  const { keyword } = useParams()

  const [searchResult, setSearchResult] = useState<{
    [key: string]: {
      dataList: any[]
      curPage: number
      totalPage: number
      totalCount: number
    }
  }>()

  const [loading, setLoading] = useState(false)
  //防止页面闪烁
  useLayoutEffect(() => {
    getData()
  }, [keyword, type])
  const getData = (page?: number) => {
    setLoading(true)
    const curPage = page || searchResult?.[SEARCH_TYPE[type].toLowerCase()]?.curPage || 1
    getSearchResult(keyword || '', (curPage - 1) * limit, type)
      .then((res) => {
        formatRes(res, type, curPage, limit, searchResult, setSearchResult)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const setCurPage = (page: number) => {
    const parseType = SEARCH_TYPE[type].toLowerCase()
    if (searchResult && searchResult[parseType]) {
      getData(page)
    }
  }
  return {
    searchResult,
    setCurPage,
    loading
  }
}

const formatRes = (
  res: any,
  type: SEARCH_TYPE,
  curPage: number,
  limit: number,
  searchResult: any,
  setSearchResult: any
) => {
  const result = res.result

  const parseType = SEARCH_TYPE[type].toLowerCase()
  setSearchResult((searchResult: any) => {
    console.log(parseType.slice(0, -1))

    return {
      ...searchResult,
      [parseType]: {
        ...[searchResult?.[parseType]],
        curPage: curPage,
        dataList: result[parseType],
        totalPage: Math.ceil(result[parseType.slice(0, -1) + 'Count'] / limit),
        totalCount: result[parseType.slice(0, -1) + 'Count']
      }
    }
  })
}
