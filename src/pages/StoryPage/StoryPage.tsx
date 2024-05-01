import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Button, Link } from "@vkontakte/vkui";
import { getItem } from "../../api/hackernews-api";
import Comments from "../../components/Comments/Comments";
import { formatTime } from "../../utils/utils";
import cls from "./StoryPage.module.css";

const StoryPage = () => {
  const params = useParams();
  const routeNavigator = useRouteNavigator();

  const { data: story, refetch } = useQuery({
    queryKey: ["story", params?.id],
    queryFn: () => getItem(Number(params?.id)),
    refetchOnWindowFocus: false,
  });

  const refreshComments = () => {
    refetch();
  };

  return (
    <section className={cls.story}>
      <Button className={cls.backBtn} onClick={() => routeNavigator.back()}>
        Вернуться
      </Button>
      <h2>{story?.title}</h2>
      <p className={cls.author}>Пользователь: {story?.by}</p>
      <div className={cls.rating}>Рейтинг: {story?.score} голосов</div>
      <p className={cls.data}>
        Дата публикации: {formatTime(story?.time as number)}
      </p>
      <Link target="_blank" href={story?.url}>
        Ссылка на новость
      </Link>

      {/* comments layout */}
      <h3>Комментарии</h3>
      <Button className={cls.refreshBtn} onClick={refreshComments}>
        Обновить комментарии
      </Button>
      <Comments item={story} />
    </section>
  );
};

export default StoryPage;
