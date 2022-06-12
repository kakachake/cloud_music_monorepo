import { FunctionComponent, useState } from 'react'
import { Outlet } from 'react-router-dom'
import style from './Video.module.css'
import Toast from '../../components/Toast/Toast'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
interface VideoProps {}

const Video: FunctionComponent<VideoProps> = () => {
  const [tabList, setTabList] = useState([
    {
      title: '视频',
      path: '/video/v'
    },
    {
      title: 'MV',
      path: '/video/mv'
    }
  ])
  return (
    <div className={style.video}>
      <TabBar route={true}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem key={index} path={item.path}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>
      <div className={style.videoContent}>
        <Outlet />
      </div>
    </div>
  )
}

export default Video
