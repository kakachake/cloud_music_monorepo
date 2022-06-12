import { FunctionComponent, useState } from 'react'
import { Outlet } from 'react-router-dom'
import style from './Home.module.css'
import Toast from '../../components/Toast/Toast'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [tabList, setTabList] = useState([
    {
      title: '个性推荐',
      path: '/'
    },
    {
      title: '歌单',
      path: '/songSheets/default/华语',
      regPath: /^\/songSheets/
    },
    {
      title: '排行榜',
      path: '/rank'
    },
    {
      title: '歌手',
      path: '/artists'
    }
  ])
  return (
    <div className={style.home}>
      <TabBar route={true}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem key={index} path={item.path} regPath={item.regPath}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>
      <div className={style.homeContent}>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
