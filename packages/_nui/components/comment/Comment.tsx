import { FC, useEffect } from "react";
import { CommentType } from "../type/type";
import CommentItem from "./CommentItem";
import style from "./Comment.module.css";
interface CommentProps {
  commentList: CommentType[];
  onLike: (id: number, liked: 1 | 0) => void;
}

const Comment: FC<CommentProps> = (props) => {
  const { commentList, onLike } = props;
  return (
    <div className={style.commentWrap}>
      {commentList?.map((item, index) => {
        return (
          <div className={style.commentItem} key={index}>
            <CommentItem onLike={onLike} comment={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
