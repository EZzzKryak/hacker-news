import { useQueries } from "@tanstack/react-query";
import { Item, getItem } from "../../api/hackernews-api";
import Comments from "../Comments/Comments";
import cls from "./CommentsLayout.module.css";

interface CommentsLayoutProps {
  item: Item | undefined;
  refetchStory?: () => void;
}

const CommentsLayout = ({ item, refetchStory }: CommentsLayoutProps) => {
  const commentsData = useQueries({
    queries: item?.kids
      ? item.kids?.map(commentId => {
          return {
            queryKey: ["comments", commentId],
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
  const refreshComments = () => {
    // for parent comments
    if (refetchStory) {
      refetchStory();
    }
    // for children comments
    commentsData.refetchAllComments();
  };

  const notDeletedComments = commentsData.data.filter(comment => {
    return !comment?.deleted;
  });

  return (
    <div>
      <p className={cls.commentsHead}>
        Комментарии:{" "}
        {!commentsData.pending && <span>{notDeletedComments.length}</span>}
      </p>

      <button className={cls.refreshBtn} onClick={refreshComments}>
        Обновить комментарии
      </button>
      {commentsData.pending ? (
        <p>Загрузка комментариев...</p>
      ) : (
        <Comments notDeletedComments={notDeletedComments} />
      )}
    </div>
  );
};

export default CommentsLayout;
