import { lazy, Suspense } from 'react'
import { Navigate, Route, useLocation, useRoutes } from 'react-router-dom'
import { Loading } from '@cloud_music/nui'
import MVList from '../pages/video/mvList/MVList'
import Video from '../pages/video/Video'
import VideoList from '../pages/video/videoList/VideoList'
import MVDetail from '../pages/videoDetail/mv/MVDetail'
import VideoDetail from '../pages/videoDetail/v/VideoDetail'
import store, { RootState } from '../redux/store'
import createLogin from '../components/login'
import { useSelector } from 'react-redux'
import UserDetail from '../pages/userDetail/UserDetail'
const Content = lazy(() => import('../layout/defalutLayout/content/Content'))
const Home = lazy(() => import('../pages/home/Home'))
const MusicDetail = lazy(() => import('../layout/defalutLayout/MusicDetail/MusicDetail'))
const Suggest = lazy(() => import('../pages/home/suggest/Suggest'))
const SongSheets = lazy(() => import('../pages/home/songSheets/SongSheets'))
const HighQuality = lazy(() => import('../pages/HighQuality/HighQuality'))
const Rank = lazy(() => import('../pages/home/rank/Rank'))
const PersonalFm = lazy(() => import('../pages/personalFm/PersonalFm'))
const SongSheet = lazy(() => import('../pages/songSheet/SongSheet'))
const Album = lazy(() => import('../pages/album/Album'))
const Artist = lazy(() => import('../pages/artist/Artist'))
const Search = lazy(() => import('../pages/search/Search'))
const Artists = lazy(() => import('../pages/home/artists/Artists'))
// const VideoDetail = lazy(() => import('../pages/videoDetail/v/VideoDetail'))

function RequireAuth({ children }: { children: JSX.Element }) {
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const location = useLocation()

  if (!userInfo?.userId) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    createLogin.create()
  }

  return children
}

export const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <RequireAuth>
          <Suspense fallback={<Loading />}>
            <Content />
          </Suspense>
        </RequireAuth>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
          children: [
            {
              path: '',
              element: (
                <Suspense fallback={<Loading />}>
                  <Suggest />
                </Suspense>
              )
            },
            {
              path: 'songSheets',
              element: (
                <Suspense fallback={<Loading />}>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: 'songSheets/default/',
              element: (
                <Suspense fallback={<Loading />}>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: 'songSheets/default/:type',
              element: (
                <Suspense fallback={<Loading />}>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: 'songSheets/highquality/:type',
              element: (
                <Suspense fallback={<Loading />}>
                  <HighQuality />
                </Suspense>
              )
            },
            {
              path: 'rank',
              element: (
                <Suspense fallback={<Loading />}>
                  <Rank />
                </Suspense>
              )
            },
            {
              path: 'artists',
              element: (
                <Suspense fallback={<Loading />}>
                  <Artists />
                </Suspense>
              )
            }
          ]
        },
        {
          path: '/video',
          element: (
            <Suspense fallback={<Loading />}>
              <Video />
            </Suspense>
          ),
          children: [
            {
              path: 'v',
              element: (
                <Suspense fallback={<Loading />}>
                  <VideoList />
                </Suspense>
              )
            },
            {
              path: 'mv',
              element: (
                <Suspense fallback={<Loading />}>
                  <MVList />
                </Suspense>
              )
            }
          ]
        },
        {
          path: '/personalFm',
          element: (
            <Suspense fallback={<Loading />}>
              <PersonalFm />
            </Suspense>
          )
        },
        {
          path: '/songSheet/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <SongSheet />
            </Suspense>
          )
        },
        {
          path: '/album/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <Album />
            </Suspense>
          )
        },
        {
          path: '/artist/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <Artist />
            </Suspense>
          )
        },
        {
          path: '/search/:keyword',
          element: (
            <Suspense fallback={<Loading />}>
              <Search />
            </Suspense>
          )
        },
        {
          path: 'user/me',
          element: (
            <Suspense fallback={<Loading />}>
              <UserDetail me />
            </Suspense>
          )
        },
        {
          path: 'user/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <UserDetail />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Content hiddenSideBar={true} />
        </Suspense>
      ),
      children: [
        {
          path: '/videoDetail/v/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <VideoDetail />
            </Suspense>
          )
        },
        {
          path: '/videoDetail/mv/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <MVDetail />
            </Suspense>
          )
        }
      ]
    }
  ])
  return routes
}
