import { FC } from 'react'
import style from './UserInfoHeader.module.less'
export interface UserInfo {
  level: number
  nikename: string
  avatarUrl: string
  // 关注数
  follows: number
  // 动态数
  eventCount: number
  // 粉丝数
  followeds: number
  // 简介
  signature: string
  gender: 1 | 2 | number
}

interface UserInfoHeaderProps {
  userInfo: UserInfo
  me?: boolean
}

const UserInfoHeader: FC<UserInfoHeaderProps> = (props) => {
  const { userInfo, me } = props
  return (
    <div className={`${style.contentWrap} `}>
      <div className={style.avatar}>
        <img src={userInfo.avatarUrl} alt='' />
      </div>
      <div className={style.right}>
        <div className={style.nikename}>{userInfo.nikename}</div>
        <div className={style.base}>
          <span className={style.level}>Lv {userInfo.level}</span>
          <span className={`${style.gender} ${userInfo.gender === 1 ? style.man : style.woman}`}>
            {userInfo.gender === 1 ? '男' : '女'}
          </span>
        </div>
        <div className='divider'></div>
        <div className={style.infoData}>
          <div className={style.infoDataItem}>
            <span className={style.data}>{userInfo.eventCount}</span>
            <span>动态</span>
          </div>
          <div className={style.infoDataItem}>
            <span className={style.data}>{userInfo.follows}</span>
            <span>关注</span>
          </div>
          <div className={style.infoDataItem}>
            <span className={style.data}>{userInfo.followeds}</span>
            <span>粉丝</span>
          </div>
        </div>
        <div className={style.other}>
          <span>个人介绍：{userInfo.signature}</span>
        </div>
      </div>
    </div>
  )
}

export default UserInfoHeader
