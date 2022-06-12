import { LoadingOutlined } from '@ant-design/icons'
import { FC, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HighQualitySongSheetType } from '../../type/highQualitySongSheet'
import { isScrollBottom } from '../../utils'
import HighQualitySongSheetItem from '../component/highQualitySongSheetItem/HighQualitySongSheetItem'
import style from './HighQuality.module.css'
import { useGetHighSongSheet } from './hooks/useGetHighSongSheet'

interface HighQualityProps {}

const HighQuality: FC<HighQualityProps> = () => {
  const { type } = useParams()
  const { highQualityList, isLoading, hasMore, getMore } = useGetHighSongSheet()
  const addPage = useCallback(() => {
    console.log('addPage')
    console.log(isLoading, hasMore)

    if (!isLoading && hasMore) {
      getMore()
    }
  }, [getMore, highQualityList])
  const scrollAddPage = useCallback(() => {
    const mainContent = document.querySelector('#mainContent')
    const isBottom = isScrollBottom(mainContent!)
    console.log(isBottom, isLoading)
    if (isBottom) {
      addPage()
    }
  }, [addPage])
  useEffect(() => {
    const mainContent = document.querySelector('#mainContent')
    mainContent?.addEventListener('scroll', scrollAddPage)

    return () => {
      mainContent?.removeEventListener('scroll', scrollAddPage)
    }
  }, [scrollAddPage])

  return (
    <div>
      <div className={style.listWrap}>
        {highQualityList &&
          highQualityList.map((item: HighQualitySongSheetType) => (
            <HighQualitySongSheetItem key={item.id} songSheetInfo={item} />
          ))}
      </div>
      {hasMore && (
        <div className={style.loading}>
          <LoadingOutlined />
          加载中...
        </div>
      )}
    </div>
  )
}

export default HighQuality
