import { CloudDownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { Search } from 'react-router-dom'
import { IconFont } from '../../../assets/css/iconFont'
import Like from '../../../components/like/Like'
import MuTable, { TableColumnType } from '../../../components/muTable/MuTable'
import Pagination from '../../../components/pagination/Pagination'
import { addMusic, setMusicList } from '../../../controller/musicControl'
import { downLoadMusic } from '../../../service/api/music'
import { SongType } from '../../../type/song'
import { parseSecondToTime } from '../../../utils'
import HeaderButton from '../../component/headerButton/HeaderButton'
import { SearchSongType } from '../type/searchSongType'
import style from './SongTabPage.module.css'
interface SongTabPageProps {
  data?: {
    dataList: Partial<SongType>[]
    curPage: number
    totalPage: number
  }
  setCurPage: React.Dispatch<any>
}

const SongTabPage: FC<SongTabPageProps> = (props) => {
  const {
    data = {
      dataList: [],
      curPage: 0,
      totalPage: 0
    },
    setCurPage
  } = props

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
      width: (9 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'ar',
      render: (data) => {
        return <span className={`line1`}>{data?.ar?.map((item: any) => item.name).join('/')}</span>
      },
      width: (5 / 24) * 100 + '%',
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
  const onColDoubleClick = (data: any) => {
    addMusic(data)
  }
  const handlePlayList = () => {
    setMusicList(data?.dataList || [], 'musicList')
  }
  return (
    <div>
      <div className={style.headerHandle}>
        <div>
          <HeaderButton
            onClick={handlePlayList}
            bg='#ec4141'
            bgHover='#cc3232'
            icon={<IconFont className={`${style.playIcon} ${style.icon}`} type={'icon-play'} />}
            direction='left'
            content={`播放全部`}
          />
          <HeaderButton
            bg='#ec4141'
            bgHover='#cc3232'
            direction='right'
            border='left'
            icon={<PlusOutlined />}
          />
        </div>
      </div>
      {
        <MuTable
          onColDoubleClick={onColDoubleClick}
          columns={columns}
          data={data?.dataList}
          showIdx
        />
      }
      <Pagination
        onChangeCurrentPage={setCurPage}
        total={data?.totalPage}
        pageCurrent={data?.curPage}
      />
    </div>
  )
}

export default SongTabPage
