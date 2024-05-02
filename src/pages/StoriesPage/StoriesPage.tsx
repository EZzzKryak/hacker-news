import { useQueries, useQuery } from "@tanstack/react-query";
import { RouterLink } from "@vkontakte/vk-mini-apps-router";
import {
  Button,
  Card,
  Counter,
  Div,
  List,
  Panel,
  PanelHeader,
  Paragraph,
  Spacing,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { getIds, getItem } from "../../api/hackernews-api";
import { formatTime } from "../../utils/utils";
import cls from "./StoriesPage.module.css";
import { Icon24LikeOutline } from "@vkontakte/icons";

const StoriesPage = () => {
  const { data: storiesIds, refetch } = useQuery({
    queryKey: ["ids"],
    queryFn: getIds,
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 1000,
  });
  const storiesData = useQueries({
    queries: storiesIds
      ? storiesIds.map((id) => {
          return {
            queryKey: ["stories", id],
            queryFn: () => getItem(id),
            refetchOnWindowFocus: false,
          };
        })
      : [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const refreshStories = () => {
    refetch();
  };

  return (
    <Panel>
      <PanelHeader className={cls.panelHeader}>
        <Title level="1" className={cls.title}>
          MiniHackerNews
        </Title>
        <Button
          mode="outline"
          className={cls.refreshBtn}
          size="m"
          onClick={refreshStories}
        >
          Обновить новости
        </Button>
      </PanelHeader>

      <List className={cls.storiesList}>
        {storiesData.pending ? (
          <Spinner size="large" className={cls.spinner} />
        ) : (
          storiesData.data?.map((story) => (
            <Card key={story?.id} mode="shadow" className={cls.card}>
              <RouterLink className={cls.link} to={`/story/${story?.id}`}>
                <Div className={cls.cardHead}>
                  <Title level="2" className={cls.title}>
                    {story?.title}
                  </Title>
                  <Counter mode="primary" className={cls.rating}>
                    {story?.score}
                    <Icon24LikeOutline />
                  </Counter>
                </Div>
                <Div className={cls.cardText}>
                  <Paragraph className={cls.author}>
                    Автор: {story?.by}
                  </Paragraph>
                  <Spacing size={5} />
                  <Paragraph className={cls.time}>
                    Опубликовано: {formatTime(story?.time as number)}
                  </Paragraph>
                </Div>
              </RouterLink>
            </Card>
          ))
        )}
      </List>
    </Panel>
  );
};

export default StoriesPage;
