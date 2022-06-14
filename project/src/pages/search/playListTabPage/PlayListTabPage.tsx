import { PlayCircleOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MuTable, TableColumnType } from '@cloud_music/nui'
import { Pagination } from '@cloud_music/nui'
import { SongSheetType } from '../../../type/songSheet'
import { formatNumber } from '../../../utils'
import style from './PlayListTabPage.module.css'
interface ArtistTabPageProps {
  data?: { dataList: Partial<SongSheetType>[]; curPage: number; totalPage: number }
  setCurPage: React.Dispatch<any>
}

const PlayListTabPage: FC<ArtistTabPageProps> = (props) => {
  const {
    data = {
      dataList: [],
      curPage: 0,
      totalPage: 0
    },
    setCurPage
  } = props
  const navigate = useNavigate()
  const handleToSongSheet = (sheetId: string) => {
    navigate(`/songSheet/${sheetId}`)
  }
  const columns: TableColumnType<SongSheetType>[] = [
    {
      title: '封面',
      key: 'coverImgUrl',
      render: (data) => {
        return (
          <div onClick={() => handleToSongSheet(data.id)} className={style.coverImgUrl}>
            <img src={data.coverImgUrl} />
          </div>
        )
      },
      align: 'center',
      width: '150px'
    },
    {
      title: '标题',
      key: 'name',
      render: (data) => {
        return (
          <div onClick={() => handleToSongSheet(data.id)} className={style.sheetName}>
            {data.name}
          </div>
        )
      }
    },
    {
      title: '歌曲数量',
      key: 'songCount',
      render: (data) => {
        return <div>{data.trackCount}首</div>
      }
    },
    {
      title: '作者',
      key: 'anthor',
      render: (data) => {
        return <div>by {data.creator.nickname}</div>
      }
    },
    {
      title: '播放量',
      key: 'count',
      render: (data) => {
        return (
          <div>
            <PlayCircleOutlined />
            {' ' + formatNumber(data.playCount)}
          </div>
        )
      }
    }
  ]
  return (
    <div>
      {<MuTable hideHeader height={100} columns={columns} data={data?.dataList} showIdx />}
      <Pagination
        onChangeCurrentPage={setCurPage}
        total={data?.totalPage}
        pageCurrent={data?.curPage}
      />
    </div>
  )
}

export default PlayListTabPage
