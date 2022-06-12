import { FunctionComponent } from 'react'
import Header from './header/Header'
import MusicBar from './musicBar/MusicBar'

import { CSSTransition } from 'react-transition-group'
import MusicDetail from './MusicDetail/MusicDetail'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

import { GetRoutes } from '../../router/router'
const DefaultLayout: FunctionComponent = () => {
  const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
  return (
    <div>
      <Header />
      <GetRoutes />
      {/* <Content /> */}
      <MusicBar />
      <CSSTransition in={songDetailOpen} timeout={300} classNames='musicDetail' unmountOnExit>
        <MusicDetail />
      </CSSTransition>
    </div>
  )
}

export default DefaultLayout
