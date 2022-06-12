import React from 'react'
import { FunctionComponent, ReactPropTypes } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import style from './TabBar.module.css'
interface TabBarProps {
  route?: boolean //是否开启路由模式
  children?: React.ReactElement<any, any>[]
  activeIndex?: number | string // 当前激活的tabBarItem的索引
}

const TabBar: FunctionComponent<TabBarProps> = (props) => {
  const { route = false } = props
  let activeIndex = props.activeIndex
  let children = props.children
  activeIndex = route ? useLocation().pathname : activeIndex

  children = children?.map((o, i) => {
    return React.cloneElement(o, {
      active: route
        ? activeIndex === o.props.path || o.props.regPath?.test(activeIndex)
        : activeIndex === o.props.id
    })
  })
  return <div className={style.tabBar}>{children}</div>
}

export default TabBar
