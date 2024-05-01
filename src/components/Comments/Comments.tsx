import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { Item, getItem } from "../../api/hackernews-api";
import Comment from "../Comment/Comment";
import cls from "./Comments.module.css";

interface CommentsProps {
  item: Item | undefined;
}

const Comments = ({ item }: CommentsProps) => {
  const commentsData = useQueries({
    queries: item?.kids
      ? item.kids?.map(commentId => {
          return {
            queryKey: ["comments", commentId, getItem],
            queryFn: () => getItem(commentId),
            refetchOnWindowFocus: false,
          };
        })
      : [],
    combine: results => {
      return {
        data: results.map(result => result.data),
        pending: results.some(result => result.isPending),
        refetchAllComments: () => results.forEach(result => result.refetch()),
      };
    },
  });

  useEffect(() => {
    commentsData.refetchAllComments();
  }, [commentsData]);

  const notDeletedcomments = commentsData.data.filter(comment => {
    return !comment?.deleted;
  });

  return (
    <div>
      <p className={cls.commentsHead}>
        Комментарии:{" "}
        {!commentsData.pending && <span>{notDeletedcomments.length}</span>}
      </p>
      {commentsData.pending ? (
        <p>Загрузка комментариев...</p>
      ) : (
        <ul className={cls.comments}>
          {notDeletedcomments.map(comment => (
            <Comment key={comment?.id} comment={comment} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
