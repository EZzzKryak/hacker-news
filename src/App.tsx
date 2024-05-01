import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { Root, View } from "@vkontakte/vkui";
import StoriesPage from "./pages/StoriesPage/StoriesPage";
import StoryPage from "./pages/StoryPage/StoryPage";
import { HACKERNEWS_PANELS, HACKERNEWS_ROOT, HACKERNEWS_VIEW } from "./routes";

export const App = () => {
  const { view: activeView, panel: activePanel } = useActiveVkuiLocation();

  return (
    <Root activeView={activeView || HACKERNEWS_ROOT}>
      <View
        nav={HACKERNEWS_VIEW}
        activePanel={activePanel || HACKERNEWS_PANELS.HOME}
      >
        <StoriesPage nav={HACKERNEWS_PANELS.HOME} />
        <StoryPage nav={HACKERNEWS_PANELS.STORY} />
      </View>
    </Root>
  );
};
