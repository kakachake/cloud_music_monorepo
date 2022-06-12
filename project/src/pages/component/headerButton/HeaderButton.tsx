import { FunctionComponent, ReactElement } from 'react'
import style from './HeaderButton.module.css'
import styled from 'styled-components'

interface HeaderButtonProps {
  icon?: ReactElement
  onClick?: () => void
  content?: string
  direction?: 'left' | 'right' | 'both' | 'none'
  bg?: string
  bgHover?: string
  border?: 'left' | 'right' | 'both' | 'none'
  disabled?: boolean
  children?: ReactElement | string
}

const HeaderButton: FunctionComponent<HeaderButtonProps> = ({
  icon,
  content,
  direction = 'both',
  bg,
  bgHover,
  border,
  onClick,
  disabled,
  children
}) => {
  return (
    <HeaderButtonWrap
      onClick={() => !disabled && onClick && onClick()}
      bgHover={bgHover}
      bg={bg}
      style={{
        ...(disabled
          ? {
              cursor: 'not-allowed',
              borderColor: '#d8d8d8',
              color: '#d8d8d8'
            }
          : {}),
        ...(direction === 'right'
          ? {
              color: '#fff',
              border: 'none',
              paddingLeft: '5px',
              ...(border === 'left'
                ? { borderLeft: '1px solid #ed5353' }
                : border === 'right'
                ? { borderRight: '1px solid #ed5353' }
                : {})
            }
          : direction === 'left'
          ? { color: '#fff', border: 'none', paddingRight: '5px' }
          : {})
      }}
      className={`${style.headerButton} ${style['border-' + direction]}`}
    >
      {icon && <div className={style.icon}>{icon}</div>}
      {children && <div className={style.content}>{children}</div>}
      {content && <div className={style.content}>{content}</div>}
    </HeaderButtonWrap>
  )
}

export default HeaderButton

const HeaderButtonWrap = styled.div<any>`
  background-color: ${(props) => props.bg || '#fff'};
  &:hover {
    background: ${(props) => (props.bgHover ? props.bgHover : '#f2f2f2')};
  }
`
