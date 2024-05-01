import {
  createBrowserRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const HACKERNEWS_ROOT = "hackernews";
export const HACKERNEWS_VIEW = "main";
export const HACKERNEWS_PANELS = {
  HOME: "/",
  STORY: "story",
};

export const routes = RoutesConfig.create([
  createRoot(HACKERNEWS_ROOT, [
    createView(HACKERNEWS_VIEW, [
      createPanel(HACKERNEWS_PANELS.HOME, "/", []),
      createPanel(HACKERNEWS_PANELS.STORY, "/story/:id", []),
    ]),
  ]),
]);

export const router = createBrowserRouter(routes.getRoutes());
