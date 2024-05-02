import {
  Button,
  Card,
  Div,
  Paragraph,
  Spacing,
  Text,
  Title,
} from "@vkontakte/vkui";
import { FC, useState } from "react";
import { formatTime } from "../../utils/utils";
import Comments from "../Comments/Comments";
import cls from "./Comment.module.css";
import { Item } from "../../types/types";
import parse from "html-react-parser";

interface CommentProps {
  comment: Item | undefined;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const [showChildren, setShowChildren] = useState(false);

  // const parser = new DOMParser();

  // XSS !!!
  // const convertHTML = (text: string) => {
  //   const theObj = { __html: text };
  //   return <div dangerouslySetInnerHTML={theObj} />;
  // };

  const showChildrenComments = () => {
    setShowChildren((prev) => !prev);
  };

  return (
    <Card mode="outline-tint" className={cls.comment}>
      <Div className={cls.commentHead}>
        <Title level="3" className={cls.commentAuthor}>
          {comment?.by}
        </Title>
        пишет:
      </Div>
      <Text className={cls.commentText}>
        {comment?.text && parse(comment?.text)}
      </Text>
      <Spacing size={10} />
      <Paragraph className={cls.commentTime}>
        Опубликовано: {formatTime(comment?.time as number)}
      </Paragraph>
      <Spacing size={5} />
      {comment?.kids && (
        <Button size="s" mode="tertiary" onClick={showChildrenComments}>
          {showChildren ? "Скрыть комментарии" : "Показать комментарии"}
        </Button>
      )}
      <Spacing size={5} />
      {showChildren && <Comments item={comment} />}
    </Card>
  );
};

export default Comment;
