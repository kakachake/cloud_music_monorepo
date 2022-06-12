import { RightOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MuTable, TableColumnType } from '@cloud_music/nui'
import { addMusic } from '../../../controller/musicControl'
import { useSongSheet } from '../../../hooks/useSongSheet'
import { SongType } from '../../../type/song'
import { SongSheetType } from '../../../type/songSheet'
import { ToplistType } from '../../../type/topListItem'
import style from './SongSheetDetailCard.module.css'
interface SongSheetDetailCard {
  songSheetBaseInfo: ToplistType
}

const SongSheetDetailCard: FC<SongSheetDetailCard> = (props) => {
  const { songSheetBaseInfo } = props
  const [songSheetInfo, isLoading] = useSongSheet(songSheetBaseInfo.id)
  const [rankMusic, setRankMusic] = useState<SongType[] | null>(null)
  useEffect(() => {
    if (songSheetInfo) {
      setRankMusic(songSheetInfo?.tracks.slice(0, 5))
    }
  }, [songSheetInfo])
  const columns: TableColumnType[] = [
    {
      title: 'idx',
      dataIndex: 'idx',
      key: 'idx',
      render: (data: any, idx: number) => {
        return <span className={`line1 ${style[`top${idx + 1}`]}`}>{idx + 1}</span>
      },
      width: '30px',
      align: 'center'
    },
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'name',
      render: (data: any) => {
        return <span className={`line1`}>{data.name}</span>
      },
      // width: '';
      align: 'left'
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'ar',
      render: (data: any) => {
        return (
          <span style={{ padding: '0 10px' }} className={`line1`}>
            {data.ar.map((item: any) => item.name).join('/')}
          </span>
        )
      },
      width: '200px',
      align: 'right'
    }
  ]
  const onColDoubleClick = (data: any) => {
    addMusic(data)
  }
  return (
    <div>
      {isLoading ? (
        <div>加载中……</div>
      ) : (
        <div className={style.cardWrap}>
          <div className={style.left}>
            <img className={style.leftImg} src={songSheetInfo?.coverImgUrl} alt='' />
          </div>
          <div className={style.right}>
            <MuTable
              onColDoubleClick={onColDoubleClick}
              hideHeader
              columns={columns}
              data={rankMusic!}
            />
            <Link className={style.seeMore} to={'/songSheet/' + songSheetInfo?.id}>
              查看全部
              <RightOutlined />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SongSheetDetailCard
