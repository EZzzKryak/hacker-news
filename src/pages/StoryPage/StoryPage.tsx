import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Card,
  Div,
  Link,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Paragraph,
  Spinner,
  Title,
} from "@vkontakte/vkui";
import { getItem } from "../../api/hackernews-api";
import { formatTime } from "../../utils/utils";
import cls from "./StoryPage.module.css";
import CommentsLayout from "../../components/CommentsLayout/CommentsLayout";

const StoryPage = () => {
  const params = useParams();
  const routeNavigator = useRouteNavigator();

  const {
    data: story,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["story", params?.id],
    queryFn: () => getItem(Number(params?.id)),
    refetchOnWindowFocus: false,
  });

  const refreshComments = () => {
    refetch();
  };

  return (
    <Panel>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
        className={cls.panelHeader}
      >
        На главную
      </PanelHeader>
      {isPending ? (
        <Spinner size="large" className={cls.spinner} />
      ) : (
        <Card className={cls.card} mode="outline">
          <Div className={cls.cardHead}>
            <Title level="1">{story?.title}</Title>
            <Link target="_blank" href={story?.url} className={cls.link}>
              Перейти к новости
            </Link>
          </Div>
          <Div className={cls.cardText}>
            <Paragraph className={cls.author}>Автор: {story?.by}</Paragraph>
            <Paragraph className={cls.time}>
              Опубликовано: {formatTime(story?.time as number)}
            </Paragraph>
          </Div>
          <CommentsLayout item={story} refreshComments={refreshComments} />
        </Card>
      )}
    </Panel>
  );
};

export default StoryPage;
