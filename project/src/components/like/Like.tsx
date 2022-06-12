import { FC } from 'react'
import { IconFont } from '../../assets/css/iconFont'
import { useIsLiked } from '../../hooks/useLikeList'
import { handleToggleLike } from '../../service/utils'

interface LikeProps {
  id: number
}
const Like: FC<LikeProps> = (props) => {
  const { id } = props
  const isLiked = useIsLiked()
  return (
    <IconFont
      type={isLiked(id) ? 'icon-aixin_shixin' : 'icon-aixin'}
      className={`${isLiked(id) ? 'liked' : 'defaultClickIcon'} `}
      onClick={() => handleToggleLike(id, isLiked(id))}
    />
  )
}

export default Like
