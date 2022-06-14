import { LikeOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { CommentType } from '../type/type'
import { formatTime } from '../../utils'
import style from './CommentItem.module.less'
interface CommentItemProps {
  comment: CommentType
  onLike: (id: number, liked: 0 | 1) => void
}

const CommentItem: FC<CommentItemProps> = ({ comment, onLike }) => {
  return (
    <div className={style.commentItem}>
      <div className={style.avatar}>
        <img src={comment.user.avatarUrl} alt='' />
      </div>
      <div className={style.content}>
        <div className={style.commentContent}>
          <Link to={'/user/' + comment.user.userId}>
            <div className={style.userName}>{comment.user.nickname}：</div>
          </Link>
          <div className={style.commentDesc}>{comment.content}</div>
        </div>
        {comment.beReplied.length > 0 && (
          <div className={style.commentReplied}>
            <div className={style.replied}>
              <img
                className={style.repliedAvatar}
                src={comment?.beReplied?.[0]?.user.avatarUrl}
                alt=''
              />
              <div className={`${style.repliedNickName} link`}>
                {comment?.beReplied?.[0]?.user.nickname}：
              </div>
              <div className={style.repliedContent}>{comment?.beReplied?.[0]?.content}</div>
            </div>
          </div>
        )}
        <div className={style.footer}>
          <div className={style.time}>{formatTime(comment.time, 'YYYY年MM月DD日 HH:mm')}</div>
          <div className={style.otherRight}>
            <div
              className={`${style.star} ${comment.liked ? style.liked : ''}`}
              onClick={() => {
                onLike(comment.commentId, comment.liked ? 0 : 1)
              }}
            >
              <LikeOutlined /> {comment.likedCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
