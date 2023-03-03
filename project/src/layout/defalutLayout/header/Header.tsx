import { FunctionComponent, useState } from 'react'
import style from './header.module.less'
import './header.transition.css'

import {
  BorderOutlined,
  CloseOutlined,
  LeftOutlined,
  MinusOutlined,
  RightOutlined,
  SearchOutlined
} from '@ant-design/icons'
import createLogin from '../../../components/login'

import { useSelector } from '@/redux/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { IconFont } from '../../../assets/css/iconFont'
import store, { RootState } from '@/redux/store'
import { publicSlice } from '../../../redux/publicSlice/slice'
import SearchBar from './searchBar/SearchBar'
import { clearUserState } from '@/redux/user/slice'
import Toast from '@/components/Toast'
let electron: any
try {
  electron = window.require('electron')
} catch (error) {}

const Header: FunctionComponent = () => {
  const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
  const navigate = useNavigate()
  const handleLogin = () => {
    createLogin.create()
  }
  const handleLogout = () => {
    store.dispatch(clearUserState())
    Toast.success('退出成功')
    navigate('/')
  }
  function closeWin() {
    electron.ipcRenderer.send('window-close')
  }
  function maximize() {
    electron.ipcRenderer.send('window-maximize')
  }
  function minimize() {
    electron.ipcRenderer.send('window-minimize')
  }

  const handleNavigate = (direction: number) => {
    navigate(direction)
    store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  }
  const userInfo = useSelector((state) => state.user.userInfo)

  return (
    <div className={style.dragWrap}>
      <div className={style.header}>
        <div className={style.logoWraper}>
          <Link to='/' className={style.logo}>
            <IconFont className={style.icon} type={`icon-wangyiyunyinlelogo-copy`} />
          </Link>
        </div>
        <div className={`${style.left} ${songDetailOpen ? style.leftOpenStyle : ''}`}>
          <div className={style.navBar}>
            <div className={style.navBtn}>
              <div onClick={() => handleNavigate(-1)} className={style.iconWrap}>
                <LeftOutlined />
              </div>
              <div onClick={() => handleNavigate(1)} className={style.iconWrap}>
                <RightOutlined />
              </div>
            </div>
            <SearchBar />
          </div>
        </div>
        <div className={style.right}>
          {userInfo ? (
            <div className={style.loginItem}>
              <Link className={style.loginItemLink} to='/user/me'>
                <img className={style.avatar} src={userInfo.avatarUrl} alt='' />
                <div>{userInfo.nickname}</div>
              </Link>
              <div className={style.pop} onClick={handleLogout}>
                <div className={style.popItem}>退出登录</div>
              </div>
            </div>
          ) : (
            <div onClick={handleLogin} className={style.loginItem}>
              未登录
            </div>
          )}
          {electron?.ipcRenderer && (
            <div className={style.eletronControlIcon}>
              <div className={style.eletronControlIconItem} onClick={() => minimize()}>
                <MinusOutlined />
              </div>
              <div className={style.eletronControlIconItem} onClick={() => maximize()}>
                <BorderOutlined />
              </div>
              <div className={style.eletronControlIconItem} onClick={() => closeWin()}>
                <CloseOutlined />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
