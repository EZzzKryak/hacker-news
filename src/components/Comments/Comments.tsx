import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import Comment from "../Comment/Comment";
import cls from "./Comments.module.css";
import { Div, List, Spinner } from "@vkontakte/vkui";
import { Item } from "../../types/types";
import { getItem } from "../../api/hackernews-api";

interface CommentsProps {
  item: Item | undefined;
  handleSetCommentsCount?: (count: number) => void;
}

const Comments = ({ item, handleSetCommentsCount }: CommentsProps) => {
  const commentsData = useQueries({
    queries: item?.kids
      ? item.kids?.map((commentId) => {
          return {
            queryKey: ["comments", commentId, getItem],
            queryFn: () => getItem(commentId),
            refetchOnWindowFocus: false,
          };
        })
      : [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        refetchAllComments: () => results.forEach((result) => result.refetch()),
      };
    },
  });

  const notDeletedcomments = commentsData.data.filter((comment) => {
    return !comment?.deleted;
  });

  useEffect(() => {
    commentsData.refetchAllComments();
  }, [commentsData]);
  useEffect(() => {
    if (handleSetCommentsCount) {
      handleSetCommentsCount(notDeletedcomments.length);
    }
  }, [notDeletedcomments.length, handleSetCommentsCount]);

  return (
    <Div className={cls.container}>
      {commentsData.pending ? (
        <Spinner size="medium" className={cls.spinner} />
      ) : (
        <List className={cls.comments}>
          {notDeletedcomments.map((comment) => (
            <Comment key={comment?.id} comment={comment} />
          ))}
        </List>
      )}
    </Div>
  );
};

export default Comments;
