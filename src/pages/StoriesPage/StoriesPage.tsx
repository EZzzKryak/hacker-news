import { useQueries, useQuery } from "@tanstack/react-query";
import { RouterLink } from "@vkontakte/vk-mini-apps-router";
import { Button } from "@vkontakte/vkui";
import { getIds, getItem } from "../../api/hackernews-api";
import { formatTime } from "../../utils/utils";
import cls from "./StoriesPage.module.css";
// const promises = data
//   .slice(0, 99)
//   .map(id =>
//     fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
//       response => response.json()
//     )
//   );
// const result = await Promise.all(promises);

const StoriesPage = () => {
  const { data: storiesIds, refetch } = useQuery({
    queryKey: ["ids"],
    queryFn: getIds,
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 1000,
  });
  const storiesData = useQueries({
    queries: storiesIds
      ? storiesIds.map(id => {
          return {
            queryKey: ["stories", id],
            queryFn: () => getItem(id),
            refetchOnWindowFocus: false,
          };
        })
      : [],
    combine: results => {
      return {
        data: results.map(result => result.data),
        pending: results.some(result => result.isPending),
      };
    },
  });

  const refreshStories = () => {
    refetch();
  };

  return (
    <section className={cls.stories}>
      <Button className={cls.refreshBtn} onClick={refreshStories}>
        Обновить истории
      </Button>
      <ul className={cls.storiesList}>
        {storiesData.pending ? (
          <div>Loading...</div>
        ) : (
          storiesData.data?.map(story => (
            <li className={cls.story} key={story?.id}>
              <RouterLink className={cls.link} to={`/story/${story?.id}`}>
                <h2 className={cls.title}>{story?.title}</h2>
                <p className={cls.author}>Пользователь: {story?.by}</p>
                <div className={cls.rating}>
                  Рейтинг: {story?.score} голосов
                </div>
                <p className={cls.data}>
                  Дата публикации: {formatTime(story?.time as number)}
                </p>
              </RouterLink>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default StoriesPage;
