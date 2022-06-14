import { FC } from "react";
import { CommentType } from "../type/type";
interface CommentProps {
    commentList: CommentType[];
    onLike: (id: number, liked: 1 | 0) => void;
}
declare const Comment: FC<CommentProps>;
export default Comment;
