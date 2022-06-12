import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { getArtistCategory } from '../../../service/api/artist'
import { isScrollBottom } from '../../../utils'
import ArtistItem from '../../component/artistItem/ArtistItem'
import TabBar from '../../component/tabBar/TabBar'
import TabBarItem from '../../component/tabBar/TabBarItem'
import style from './Artists.module.css'
import { type, area, initial } from './config'
interface ArtistsProps {}

const Artists: FC<ArtistsProps> = () => {
  const [typeActive, setTypeActive] = useState(-1)
  const [areaActive, setAreaActive] = useState(-1)
  const [initialActive, setInitialActive] = useState('-1')
  const [artists, setArtists] = useState<any[]>([])
  const [curPage, setCurPage] = useState(1)
  const isLock = useRef(false)
  useEffect(() => {
    setCurPage(1)
    getArtistCategory({
      type: typeActive,
      area: areaActive,
      initial: initialActive,
      curPage: 1
    }).then((res) => {
      setArtists(res.artists)
    })
  }, [typeActive, areaActive, initialActive])
  const fetchMore = useCallback(() => {
    if (isLock.current) return
    isLock.current = true
    getArtistCategory({
      type: typeActive,
      area: areaActive,
      initial: initialActive,
      curPage: curPage + 1
    })
      .then((res) => {
        setCurPage(curPage + 1)
        setArtists((ars) => [...ars, ...res.artists])
        console.log(artists)
      })
      .finally(() => {
        isLock.current = false
      })
  }, [curPage, typeActive, areaActive, initialActive])

  const addPage = useCallback(() => {
    fetchMore()
  }, [fetchMore])
  const scrollAddPage = useCallback(() => {
    const mainContent = document.querySelector('#mainContent')
    const isBottom = isScrollBottom(mainContent!)

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
      <div className={style.headerTabs}>
        <div className={style.tabItem}>
          <div className={style.tabItemTitle}>语言：</div>
          <TabBar activeIndex={typeActive}>
            {type.map((item, index) => {
              return (
                <TabBarItem
                  tabBarItemClassName={style.tabBarItem}
                  tabBarItemActiveClassName={style.tabBarItemActive}
                  key={item.id}
                  id={item.id}
                  onClick={() => setTypeActive(item.id)}
                >
                  {item.name}
                </TabBarItem>
              )
            })}
          </TabBar>
        </div>
        <div className={style.tabItem}>
          <div className={style.tabItemTitle}>分类：</div>
          <TabBar activeIndex={areaActive}>
            {area.map((item, index) => {
              return (
                <TabBarItem
                  tabBarItemClassName={style.tabBarItem}
                  tabBarItemActiveClassName={style.tabBarItemActive}
                  key={item.id}
                  id={item.id}
                  onClick={() => setAreaActive(item.id)}
                >
                  {item.name}
                </TabBarItem>
              )
            })}
          </TabBar>
        </div>
        <div className={style.tabItem}>
          <div className={style.tabItemTitle}>筛选：</div>
          <TabBar activeIndex={initialActive}>
            {initial.map((item, index) => {
              return (
                <TabBarItem
                  tabBarItemClassName={style.tabBarItem}
                  tabBarItemActiveClassName={style.tabBarItemActive}
                  key={item.id}
                  id={item.id}
                  onClick={() => setInitialActive(item.id)}
                >
                  {item.name}
                </TabBarItem>
              )
            })}
          </TabBar>
        </div>
      </div>
      <div className={style.artistItem}>
        {artists?.map((item, index) => {
          return <ArtistItem key={item.id} pic={item.picUrl} name={item.name} id={item.id} />
        })}
      </div>
    </div>
  )
}

export default Artists
