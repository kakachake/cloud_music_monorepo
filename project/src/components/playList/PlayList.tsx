import { FunctionComponent } from 'react'
import { addMusic, clearPlayList } from '../../controller/musicControl'
import { useSelector } from '../../redux/hooks'

import { pad, parseSecondToTime } from '../../utils'
import { MuTable, TableColumnType } from '@cloud_music/nui'
import style from './PlayList.module.css'
interface PlayListProps {}

const PlayList: FunctionComponent<PlayListProps> = () => {
  const { list, current } = useSelector((state) => state.musicList)
  const onColDoubleClick = (data: any) => {
    addMusic(data)
  }
  const columns: TableColumnType[] = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (data: any, idx: number) => {
        return <div className={style.tableHandle}></div>
      },
      align: 'center',
      width: '20px'
    },
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'name',
      render: (data: any, idx: number) => {
        return (
          <span
            style={{ width: '200px' }}
            className={`line1 ${current === idx ? style.active : ''}`}
          >
            {data.name}
          </span>
        )
      },

      align: 'left'
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'ar',
      render: (data: any, idx: number) => {
        return (
          <span className={`line1 ${current === idx ? style.active : ''}`}>
            {data?.ar?.map((item: any) => item.name).join('/')}
          </span>
        )
      },
      align: 'left'
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      render: (data: any) => {
        return <span>{parseSecondToTime(data.dt / 1000)}</span>
      },
      width: '50px',
      align: 'center'
    }
  ]

  const handleClearList = () => {
    clearPlayList()
  }

  return (
    <div className={style.playListWrap}>
      <div className={style.playListHeader}>
        <div className={style.playListTitle}>当前播放</div>
        <div className={style.playListInfo}>
          <div className={style.playListCount}>总{list.length}首</div>
          <div className={style.playListHandles}>
            <div className={style.clearList} onClick={handleClearList}>
              清空列表
            </div>
          </div>
        </div>
      </div>
      <div className={style.playList}>
        <MuTable hideHeader onColDoubleClick={onColDoubleClick} columns={columns} data={list} />
      </div>
    </div>
  )
}

export default PlayList
