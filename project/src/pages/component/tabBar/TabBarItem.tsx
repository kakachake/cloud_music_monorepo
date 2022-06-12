import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './TabBarItem.module.css'
interface TabBarItemProps {
  children?: React.ReactNode // 自己定义children的类型,
  path?: string
  active?: boolean
  id?: string | number
  onClick?: () => void
  regPath?: RegExp
  tabBarItemClassName?: string
  tabBarItemActiveClassName?: string
}

const TabBarItem: FunctionComponent<TabBarItemProps> = (props) => {
  const {
    children,
    path = '',
    active = false,
    onClick,
    tabBarItemClassName,
    tabBarItemActiveClassName
  } = props
  const navigate = useNavigate()
  const handleToPath = () => {
    path && navigate(path)
    onClick && onClick()
  }
  return (
    <div
      onClick={handleToPath}
      className={`${tabBarItemClassName} ${style.tabBarItem} ${
        active
          ? tabBarItemActiveClassName
            ? `${tabBarItemActiveClassName}`
            : ` ${style.active}`
          : ''
      }`}
    >
      {children}
    </div>
  )
}

export default TabBarItem
