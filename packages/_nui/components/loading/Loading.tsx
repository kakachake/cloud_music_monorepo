import { FC } from 'react'
import style from './Loading.module.css'

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className={style.loadingWrap}>
      <div className={style.loadingContent}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
