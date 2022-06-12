import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MuTable, { TableColumnType } from '../../../components/muTable/MuTable'
import Pagination from '../../../components/pagination/Pagination'
import { UserProfile } from '../../../type/userDetail'
import style from './UserTabPage.module.css'

interface UserTabPageProps {
  data?: {
    dataList: Partial<UserProfile>[]
    curPage: number
    totalPage: number
  }
  setCurPage: React.Dispatch<any>
}

const UserTabPage: FC<UserTabPageProps> = (props) => {
  const { data = { dataList: [], curPage: 0, totalPage: 0 }, setCurPage } = props
  const navigate = useNavigate()

  const columns: TableColumnType<UserProfile>[] = [
    {
      title: 'img',
      dataIndex: 'img',
      key: 'img',
      render: (data) => {
        return (
          <div className={style.coverImgUrl}>
            <img src={data.avatarUrl} />
          </div>
        )
      },
      width: '110px'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: (data) => {
        return (
          <Link to={'/user/' + data.userId} className={'link'}>
            {data.nickname}
          </Link>
        )
      },
      width: '150px'
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (data) => {
        return (
          <div className={`${style.description} line1`}>{data.description || data.signature}</div>
        )
      },
      align: 'right'
    }
  ]
  const onClick = (item: UserProfile) => {
    navigate('/user/' + item.userId)
  }
  return (
    <div>
      {
        <MuTable
          onColClick={onClick}
          height={80}
          columns={columns}
          data={data?.dataList}
          hideHeader
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

export default UserTabPage
