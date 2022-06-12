import { ReactNode } from 'react'

export interface LinkItemTypes {
  name: string
  href?: string
  id?: number
  icon?: ReactNode
  children?: LinkItemTypes[]
  regPath?: RegExp
}

export const linkItems: LinkItemTypes[] = [
  {
    name: '',
    children: [
      {
        name: '发现音乐',
        href: '/'
      },
      // {
      //   name: '播客',
      //   href: '/play'
      // },
      {
        name: '视频',
        href: '/video/mv',
        regPath: /^\/video/
      },
      {
        name: '私人FM',
        href: '/personalfm'
      }
    ]
  },
  {
    name: '我的音乐',
    children: [
      {
        name: '本地与下载',
        href: '/local'
      },
      {
        name: '最近播放',
        href: '/recent'
      },
      {
        name: '我的音乐云盘',
        href: '/myCloud'
      }
    ]
  }
]
