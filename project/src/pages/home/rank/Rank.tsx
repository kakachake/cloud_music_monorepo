import { FC } from 'react'
import { useTopList } from '../../../hooks/useTopList'
import SongSheetDetailCard from '../../component/songSheetDetailCard/SongSheetDetailCard'
import SongSheetItem from '../../component/songSheetItem/SongSheetItem'
import style from './Rank.module.css'
interface RankProps {}

const Rank: FC<RankProps> = () => {
  const [topList, isLoading, detailTopList] = useTopList()

  return (
    <div className={`container1000`}>
      <div className={style.official}>
        <div className={style.headerTitle}>官方榜</div>
        <div className={style.rankListWrap}>
          {detailTopList.map((item: any) => {
            return <SongSheetDetailCard key={item.id} songSheetBaseInfo={item} />
          })}
        </div>
      </div>
      <div>
        <div className={style.headerTitle}>全球榜</div>
        <div className={style.sheetWrap}>
          {topList?.slice(4).map((item) => (
            <SongSheetItem songSheetInfo={item} key={item?.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Rank
