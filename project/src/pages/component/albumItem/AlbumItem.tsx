import {
  CloudDownloadOutlined,
  FolderAddOutlined,
  PlayCircleOutlined,
  RightOutlined
} from '@ant-design/icons'
import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Like from '../../../components/like/Like'
import MuTable, { TableColumnType } from '../../../components/muTable/MuTable'
import { addMusic, setMusicList } from '../../../controller/musicControl'
import { downLoadMusic } from '../../../service/api/music'
import { SongType } from '../../../type/song'
import { parseSecondToTime } from '../../../utils'
import style from './AlbumItem.module.css'
interface AlbumProps {
  title: string
  songs: SongType[]
  pic: string
  albumId?: string
  defalutFold?: boolean
}

const Album: FC<AlbumProps> = ({ title, songs, pic, defalutFold = true, albumId }) => {
  const onColDoubleClick = (data: any) => {
    addMusic(data)
  }
  const [fold, setFold] = useState(defalutFold)
  const sliceSongs = useMemo(() => {
    return fold ? songs.slice(0, 10) : songs
  }, [songs, fold])
  const columns: TableColumnType<SongType>[] = [
    {
      title: '操作',
      dataIndex: 'name',
      key: 'name',
      render: (data, idx: number) => {
        return (
          <div className={style.tableHandle}>
            <Like id={data.id} />

            <CloudDownloadOutlined
              onClick={() => {
                downLoadMusic(
                  data.id,
                  data.name + '-' + data?.ar?.map((item: any) => item.name).join('/')
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

      align: 'left'
    },
    {
      title: '专辑',
      dataIndex: 'al',
      key: 'al',
      render: (data) => {
        return <span className={`line1`}>{data.al?.name}</span>
      },
      width: (6 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      render: (data) => {
        return <span>{parseSecondToTime(data.dt / 1000)}</span>
      },
      width: (2 / 24) * 100 + '%',
      align: 'center'
    }
  ]
  const handlePlayList = () => {
    setMusicList(songs, 'musicList')
  }
  const navigate = useNavigate()
  const handleToAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`)
  }
  const viewAll = () => {
    albumId ? handleToAlbum(albumId) : setFold(!fold)
  }
  return (
    <div className={style.albumItemWrap}>
      <div className={style.left}>
        <img src={pic + '?param=300y300'} alt='' />
      </div>
      <div className={style.right}>
        <div className={style.rightTop}>
          <div className={style.rightTopTitle}>{title}</div>
          <div className={style.handleIcon}>
            <PlayCircleOutlined onClick={handlePlayList} className={`defaultClickIcon`} />
            <FolderAddOutlined className={`defaultClickIcon`} />
          </div>
        </div>
        <MuTable
          height={30}
          onColDoubleClick={onColDoubleClick}
          columns={columns}
          data={sliceSongs}
          showIdx
        />
        {fold === true && songs.length > 10 && (
          <div onClick={viewAll} className={style.footer}>
            查看全部{songs.length}首
            <RightOutlined />
          </div>
        )}
      </div>
    </div>
  )
}

export default Album
