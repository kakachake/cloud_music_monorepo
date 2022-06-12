import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CommentType } from '../../../type/type'
import { useComment } from '../../../hooks/useComment'
import { Comment } from '@cloud_music/nui'
import style from './Comment.module.css'
import { Pagination } from '@cloud_music/nui'
import { comment_type, likeComment } from '../../../service/api/comment'
interface CommentTabPageProps {
  id: string
  type: 'Song' | 'PlayList' | 'Album' | 'MV' | 'Video'
  onPageChange?: (page: number) => void
}

const CommentTabPage: FC<CommentTabPageProps> = (props) => {
  const { id, type, onPageChange } = props
  const { comments, hotComments, curPage, setCurPage, total, fetchData } = useComment(id, type)

  const handleLike = (cid: number, liked: 0 | 1) => {
    likeComment(id, cid, comment_type[type], liked).then((res) => {
      if (res.code === 200) {
        fetchData()
      }
    })
  }

  return (
    <div className={style.comment}>
      {hotComments.length > 0 && (
        <>
          <div className={style.commentTitle}>热门评论 ({total})</div>
          <Comment onLike={handleLike} commentList={hotComments} />
        </>
      )}
      <div className={style.commentTitle}>全部评论 ({total})</div>
      <Comment onLike={handleLike} commentList={comments} />
      <div className={style.pagination}>
        <Pagination
          onChangeCurrentPage={(cur) => {
            setCurPage(cur)
            onPageChange && onPageChange(cur)
          }}
          total={Math.ceil(total / 20)}
          pageCurrent={curPage}
        />
      </div>
    </div>
  )
}

export default CommentTabPage
