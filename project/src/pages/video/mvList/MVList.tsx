import { FC, useState } from 'react'
import { useMVFirstList } from '../../../hooks/useMVFirstList'
import LinkTab from '../../component/linkTab/LinkTab'
import TabBar from '../../component/tabBar/TabBar'
import TabBarItem from '../../component/tabBar/TabBarItem'
import VideoListItem from '../../component/videoListItem/VideoListItem'
import style from './MVList.module.less'
interface MVListProps {}

const MVList: FC<MVListProps> = () => {
  const [typeActive, setTypeActive] = useState('')
  const [mvFirst = [], mvFirstLoading] = useMVFirstList(typeActive)
  const [mvNetease = [], mvNeteaseLoading] = useMVFirstList(typeActive)
  const type = ['内地', '港台', '欧美', '日本', '韩国']
  return (
    <div>
      <div className={style.contentItem}>
        <div className={style.header}>
          <LinkTab title='最新MV' to='' />
          <TabBar activeIndex={typeActive}>
            {type.map((item, index) => {
              return (
                <TabBarItem
                  tabBarItemClassName={style.tabBarItem}
                  tabBarItemActiveClassName={style.tabBarItemActive}
                  key={item}
                  id={item}
                  onClick={() => setTypeActive(item)}
                >
                  {item}
                </TabBarItem>
              )
            })}
          </TabBar>
        </div>
        <div className={style.ListWrap}>
          {mvFirst.map((item, index) => {
            return (
              <VideoListItem
                key={index}
                name={item.name}
                playCount={item.playCount}
                img={item.cover}
                id={item.id}
                type='mv'
                artists={item.artists}
              />
            )
          })}
        </div>
      </div>
      <div className={style.contentItem}>
        <div className={style.header}>
          <LinkTab title='网易出品MV' to='' />
        </div>
        <div className={style.ListWrap}>
          {mvNetease.map((item, index) => {
            return (
              <VideoListItem
                key={index}
                name={item.name}
                playCount={item.playCount}
                img={item.cover}
                id={item.id}
                type='mv'
                artists={item.artists}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MVList
