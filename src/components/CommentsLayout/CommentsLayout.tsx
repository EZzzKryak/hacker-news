import { Button, Counter, Div, Group, Title } from "@vkontakte/vkui";
import Comments from "../Comments/Comments";
import cls from "./CommentsLayout.module.css";
import { useState } from "react";
import { Item } from "../../types/types";

interface CommentsLayoutProps {
  item: Item | undefined;
  refreshComments: () => void;
}

const CommentsLayout = ({ item, refreshComments }: CommentsLayoutProps) => {
  const [commentsCount, setCommentsCount] = useState<number>(0);

  const handleSetCommentsCount = (count: number) => {
    setCommentsCount(count);
  };

  return (
    <Group className={cls.comments}>
      <Div className={cls.commentsHead}>
        <Title level="3">Комментарии</Title>
        <Counter mode="primary" style={{ display: "inline-block" }}>
          {commentsCount}
        </Counter>
        <Button
          size="l"
          mode="secondary"
          className={cls.refreshBtn}
          onClick={refreshComments}
        >
          Обновить комментарии
        </Button>
      </Div>
      <Comments handleSetCommentsCount={handleSetCommentsCount} item={item} />
    </Group>
  );
};

export default CommentsLayout;
