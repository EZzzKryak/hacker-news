import { Button } from "@vkontakte/vkui";
import { FC, useState } from "react";
import { Item } from "../../api/hackernews-api";
import { formatTime } from "../../utils/utils";
import Comments from "../Comments/Comments";
import cls from "./Comment.module.css";

interface CommentProps {
  comment: Item | undefined;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const [showChildren, setShowChildren] = useState(false);

  const showChildrenComments = () => {
    setShowChildren(prev => !prev);
  };

  return (
    <li className={cls.comment}>
      <p className={cls.commentAuthor}>{comment?.by} пишет:</p>
      <h3 className={cls.commentText}>{comment?.text}</h3>
      <p className={cls.commentTime}>{formatTime(comment?.time as number)}</p>
      {comment?.kids && (
        <Button onClick={showChildrenComments}>
          {showChildren ? "Скрыть комментарии" : "Показать комментарии"}
        </Button>
      )}
      {showChildren && <Comments item={comment} />}
    </li>
  );
};

export default Comment;
