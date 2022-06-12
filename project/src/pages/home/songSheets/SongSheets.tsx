import { FC, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSongSheet } from './hooks/useGetSongSheet'
import { useSongsheetsCategory } from './hooks/usePlayListHot'
import style from './SongSheets.module.css'
import styled from 'styled-components'
import TabBar from '../../component/tabBar/TabBar'
import TabBarItem from '../../component/tabBar/TabBarItem'
import SongSheetItem from '../../component/songSheetItem/SongSheetItem'
import { Pagination } from '@cloud_music/nui'
interface SongSheetsProps {}

const SongSheets: FC<SongSheetsProps> = () => {
  const { songSheetsCategory } = useSongsheetsCategory()

  const { highquality, playList, playListTotal, curPage, setCurPage } = useGetSongSheet()
  const { type } = useParams()
  const navigate = useNavigate()
  const handleToHighQualityPage = useCallback(() => {
    navigate(`/songSheets/highQuality/${type}`)
  }, [type])
  return (
    <div className={`${style.songSheetsWrap} container1000`}>
      {highquality && (
        <div onClick={handleToHighQualityPage} className={style.headerWrap}>
          <div className={style.leftImg}>
            <img src={highquality?.coverImgUrl + '?param=300y300'} alt='' />
          </div>
          <div className={style.right}>
            <div className={style.tag}>精品歌单</div>
            <div className={style.title}>{highquality?.name}</div>
            <div className={style.copywriter}>{highquality?.copywriter}</div>
          </div>
          <HeaderBgImg bgImg={highquality?.coverImgUrl}></HeaderBgImg>
        </div>
      )}
      <div className={style.category}>
        <div className={style.hotCategories}>
          <TabBar route={true}>
            {songSheetsCategory.map((item, index) => {
              return (
                <TabBarItem
                  tabBarItemClassName={style.tabBarItem}
                  tabBarItemActiveClassName={style.tabBarItemActive}
                  key={index}
                  path={'/songSheets/default/' + encodeURIComponent(item.name)}
                >
                  {item.name}
                </TabBarItem>
              )
            })}
          </TabBar>
        </div>
      </div>
      <div className={`sheetWrap`}>
        {playList.map((item) => (
          <SongSheetItem songSheetInfo={item} key={item.id} />
        ))}
      </div>
      <Pagination
        onChangeCurrentPage={setCurPage}
        total={Math.ceil(playListTotal / 20)}
        pageCurrent={curPage}
      />
    </div>
  )
}

export default SongSheets

const HeaderBgImg = styled.div<{ bgImg: string }>`
  position: absolute;
  background-image: ${(props) => `url(${props.bgImg})`};
  background-size: cover;
  background-position: center;
  filter: blur(40px) brightness(0.6);
  width: 100%;
  height: 100%;
  z-index: 0;
  left: 0;
`
