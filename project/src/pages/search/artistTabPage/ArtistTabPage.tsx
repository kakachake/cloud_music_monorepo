import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MuTable, TableColumnType } from '@cloud_music/nui'
import { Pagination } from '@cloud_music/nui'
import { ArtistType } from '../../../type/artist'
import style from './ArtistTabPage.module.css'

interface ArtistTabPageProps {
  data?: { dataList: Partial<ArtistType>[]; curPage: number; totalPage: number }

  setCurPage: React.Dispatch<any>
}

const ArtistTabPage: FC<ArtistTabPageProps> = (props) => {
  const {
    data = {
      dataList: [],
      curPage: 0,
      totalPage: 0
    },
    setCurPage
  } = props

  const navigate = useNavigate()
  const handleToArtist = (artistId: string) => {
    navigate(`/artist/${artistId}`)
  }

  const columns: TableColumnType<ArtistType>[] = [
    {
      title: '封面',
      key: 'coverImgUrl',
      render: (data) => {
        return (
          <div onClick={() => handleToArtist(data.id)} className={style.coverImgUrl}>
            <img src={data.picUrl} />
          </div>
        )
      },
      align: 'center',
      width: '150px'
    },
    {
      title: '作者',
      key: 'anthor',
      render: (data) => {
        return (
          <div onClick={() => handleToArtist(data.id)}>
            {data.name}
            {data?.alia?.length && <span className={style.alias}>（{data?.alia?.join('/')}）</span>}
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

export default ArtistTabPage
