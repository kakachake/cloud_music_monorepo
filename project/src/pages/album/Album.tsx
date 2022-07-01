import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { downLoadMusic, getPlaylistDetail } from '../../service/api/music'
import { formatNumber, formatTime, pad, parseSecondToTime } from '../../utils'
import PlayListHeader, { PLAY_LIST_TYPE } from '../component/PlayListHeader/PlayListHeader'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
import style from './Album.module.css'
import { MuTable, TableColumnType } from '@cloud_music/nui'
import { useAlbum } from './hooks/useAlbum'
import { CloudDownloadOutlined, HeartOutlined } from '@ant-design/icons'

import { addMusic, setMusicList } from '../../controller/musicControl'
import CommentTabPage from '../component/commentTabPage/CommentTabPage'
import { IconFont } from '../../assets/css/iconFont'
import { likeMusic } from '../../service/api/reqLoginApi/loginMusicHandle'
import { handleToggleLike } from '../../service/utils'
import { useIsLiked } from '../../hooks/useLikeList'
import Like from '../../components/like/Like'
import { subPlayList } from '../../service/api/reqLoginApi/songSheets'
import Toast from '../../components/Toast'
import { SongSheetType } from '../../type/songSheet'
import { comment_type } from '../../service/api/comment'

interface SongSheetProps {}

const SongSheet: FunctionComponent<SongSheetProps> = () => {
  const { id } = useParams()
  const { albumInfo, tabList, handleGetPlaylistDetail } = useAlbum(id!)

  const [activeIndex, setActiveIndex] = useState<string>('playList')
  const handleChangeTab = (id: string) => setActiveIndex(id)

  const location = useLocation()
  useEffect(() => {
    if (location.pathname.includes('/songSheet')) {
      setActiveIndex('playList')
    }
  }, [location])
  const isLiked = useIsLiked()

  const columns: TableColumnType[] = [
    {
      title: '操作',
      dataIndex: 'name',
      key: 'name',
      render: (data: any, idx: number) => {
        return (
          <div className={style.tableHandle}>
            <Like id={data.id} />

            <CloudDownloadOutlined
              onClick={() => {
                downLoadMusic(
                  data.id,
                  data.name + '-' + data.ar.map((item: any) => item.name).join('/')
                )
              }}
              className={'defaultClickIcon'}
            />
          </div>
        )
      },
      width: (2 / 24) * 100 + '%',
      align: 'center'
    },
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'name',
      render: (data: any) => {
        return <span className={`line1`}>{data.name}</span>
      },
      width: (9 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'ar',
      render: (data: any) => {
        return <span className={`line1`}>{data.ar.map((item: any) => item.name).join('/')}</span>
      },
      width: (5 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '专辑',
      dataIndex: 'al',
      key: 'al',
      render: (data: any) => {
        return <span className={`line1`}>{data.al.name}</span>
      },
      width: (6 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      render: (data: any) => {
        return <span>{parseSecondToTime(data.dt / 1000)}</span>
      },
      width: (2 / 24) * 100 + '%',
      align: 'center'
    }
  ]
  const onColDoubleClick = (data: any) => {
    addMusic(data)
  }
  const handlePlayList = () => {
    if (!albumInfo) {
      return
    }
    const { songs } = albumInfo
    setMusicList(songs, 'musicList')
  }
  const toggleSubscribe = () => {
    // if (albumInfo) {
    //   subPlayList(albumInfo.album?.id, albumInfo?.album?.subscribed ? 0 : 1).then(() => {
    //     Toast.success(albumInfo.subscribed ? '取消收藏成功' : '收藏成功')
    //     handleGetPlaylistDetail()
    //   })
    // }
  }
  const parseHeaderInfo = useMemo((): Partial<SongSheetType> => {
    if (!albumInfo) {
      return {} as SongSheetType
    }
    const { album } = albumInfo
    return {
      id: album.id,
      name: album.name,
      createTime: album.publishTime,
      creator: {
        nickname: album.artist.name,
        avatarUrl: ''
      },
      coverImgUrl: album.picUrl
    }
  }, [albumInfo])
  return (
    <div className={style.songSheet}>
      <PlayListHeader
        handlePlayList={handlePlayList}
        listInfo={parseHeaderInfo}
        type={PLAY_LIST_TYPE.album}
        toggleSubscribe={toggleSubscribe}
      />
      <TabBar activeIndex={activeIndex}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem onClick={() => handleChangeTab(item.id)} key={item.id} id={item.id}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>
      <div className={style.songSheetContent}>
        {activeIndex === 'playList' && (
          <MuTable
            onColDoubleClick={onColDoubleClick}
            columns={columns}
            data={albumInfo?.songs || []}
            showIdx
          />
        )}
        {activeIndex === 'comment' && (
          <div>
            <CommentTabPage id={id!} type='Album' />
          </div>
        )}
        {activeIndex === 'favoriter' && <div>收藏者</div>}
      </div>
    </div>
  )
}

export default SongSheet
