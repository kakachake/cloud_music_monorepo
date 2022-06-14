import { PlayCircleOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MuTable, TableColumnType } from '@cloud_music/nui'
import { Pagination } from '@cloud_music/nui'
import { AlbumType } from '../../../type/album'

import style from './AlbumTabPage.module.css'
interface ArtistTabPageProps {
  data?: { dataList: Partial<AlbumType>[]; curPage: number; totalPage: number }
  setCurPage: React.Dispatch<any>
}

const AlbumTabPage: FC<ArtistTabPageProps> = (props) => {
  const {
    data = {
      dataList: [],
      curPage: 0,
      totalPage: 0
    },
    setCurPage
  } = props
  const navigate = useNavigate()
  const handleToAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`)
  }
  const columns: TableColumnType<AlbumType>[] = [
    {
      title: '封面',
      key: 'coverImgUrl',
      render: (data) => {
        return (
          <div onClick={() => handleToAlbum(data.id)} className={style.coverImgUrl}>
            <img src={data.picUrl} />
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
          <div onClick={() => handleToAlbum(data.id)} className={style.sheetName}>
            {data.name}
          </div>
        )
      }
    },
    {
      title: '作者',
      key: 'anthor',
      render: (data) => {
        return (
          <div>
            {data.artist.name}
            {data.artist.alias.length > 0 && <span>({data.artist.alias.join('/')})</span>}
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

export default AlbumTabPage
