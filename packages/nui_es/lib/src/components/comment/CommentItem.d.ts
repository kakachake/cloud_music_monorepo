import { FC } from 'react';
import { CommentType } from '../type/type';
interface CommentItemProps {
    comment: CommentType;
    onLike: (id: number, liked: 0 | 1) => void;
}
declare const CommentItem: FC<CommentItemProps>;
export default CommentItem;
