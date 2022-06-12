import { FunctionComponent, useEffect, useState } from 'react'
import { Swiper, SwiperItem } from '@cloud_music/nui'
import { addMusic } from '../../../controller/musicControl'
import store from '../../../redux/store'
import { getBanner } from '../../../service/api/home'
import { getPersonalizedSongSheets } from '../../../service/api/music'
import { getDailyRecommend } from '../../../service/api/reqLoginApi/songSheets'
import { SongSheetsType } from '../../../service/api/type'
import LinkTab from '../../component/linkTab/LinkTab'
import SongSheetItem from '../../component/songSheetItem/SongSheetItem'
import style from './Suggest.module.css'
interface SuggestProps {}

const Suggest: FunctionComponent<SuggestProps> = () => {
  const [songSheets, setSongSheets] = useState<SongSheetsType[]>([])
  const [banners, setBanners] = useState<any[]>([])
  useEffect(() => {
    getDailyRecommend().then((res) => {
      setSongSheets(res.recommend)
    })
    getBanner().then((res) => {
      setBanners(res.banners)
    })
  }, [])
  const handleBannerClick = (item: any) => {
    switch (item.targetType) {
      case 1:
        addMusic(item.song)
        break
    }
  }
  return (
    <div className={style.suggest}>
      <Swiper>
        {banners.map((o, i) => {
          return (
            <SwiperItem key={i} index={i}>
              <div style={{ cursor: 'pointer' }} onClick={() => handleBannerClick(o)}>
                <img src={o.pic} alt='' />
              </div>
            </SwiperItem>
          )
        })}
      </Swiper>
      <LinkTab title='推荐歌单' to='/' />
      <div className={`sheetWrap`}>
        {songSheets.map((item) => (
          <SongSheetItem songSheetInfo={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default Suggest
