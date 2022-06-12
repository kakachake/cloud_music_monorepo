import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '@cloud_music/nui'
import PlayListPreviewCard from '../../components/playListPreviewCard/PlayListPreviewCard'
import { useUserDetail } from '../../hooks/useUserDetail'
import { useUserPlayList } from '../../hooks/useUserPlayList'
import store from '../../redux/store'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
import UserInfoHeader, { UserInfo } from '../component/userInfoHeader/UserInfoHeader'

import PlayListProvider from './PlayListProvider'
import style from './UserDetail.module.css'
interface UserDetailProps {
  me?: boolean
}

const UserDetail: FC<UserDetailProps> = ({ me = false }) => {
  const id = me ? store.getState().user?.userInfo?.userId : useParams().id
  console.log(id)

  if (!id) return null

  const [userDeatil, loading, error] = useUserDetail(id)
  const [playListStyle, setPlayListStyle] = useState(0)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [ownList, likeList, listLoading] = useUserPlayList(id)
  const [activeTab, setActiveTab] = useState(0)
  const handleChangeTab = (id: number) => {
    setActiveTab(id)
  }

  const [tabList, setTabList] = useState([
    {
      title: '创建的歌单'
    },
    {
      title: '收藏的歌单'
    }
  ])

  useEffect(() => {
    if (userDeatil) {
      setUserInfo({
        nikename: userDeatil.profile.nickname,
        avatarUrl: userDeatil.profile.avatarUrl,
        follows: userDeatil.profile.follows,
        eventCount: userDeatil.profile.eventCount,
        followeds: userDeatil.profile.followeds,
        signature: userDeatil.profile.signature,
        gender: userDeatil.profile.gender,
        level: userDeatil.level
      })
    }
  }, [userDeatil])
  if (loading) return <Loading />
  if (error) return <div>未知用户信息！</div>

  function playList(playList: any[]) {
    switch (playListStyle) {
      case 0:
        return (
          <>
            {playList.map((playListItem) => {
              return (
                <PlayListProvider key={playListItem.id} playList={playListItem}></PlayListProvider>
              )
            })}
          </>
        )
    }
  }

  return (
    <div className={style.userDetail}>
      <div className={style.headerInfo}>
        {userInfo && <UserInfoHeader userInfo={userInfo} me />}
      </div>
      <TabBar activeIndex={activeTab}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem onClick={() => handleChangeTab(index)} key={index} id={index}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>

      {listLoading ? (
        <Loading />
      ) : (
        <>
          <div style={{ display: activeTab === 0 ? '' : 'none' }}>{playList(ownList)}</div>
          <div style={{ display: activeTab === 1 ? '' : 'none' }}>{playList(likeList)}</div>
        </>
      )}
    </div>
  )
}

export default UserDetail
