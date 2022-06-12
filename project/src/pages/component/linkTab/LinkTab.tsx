import { RightOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import style from './LinkTab.module.css'
interface LinkTabProps {
  title: string
  to: string
  hasIcon?: boolean
}

const LinkTab: FunctionComponent<LinkTabProps> = (props) => {
  const { title, to, hasIcon = true } = props
  return (
    <div className={style.linkTab}>
      <Link to={to}>{title}</Link>
      {hasIcon ? <RightOutlined /> : ''}
    </div>
  )
}

export default LinkTab
