import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Score from "../Score";

const url = new URL(location.href);
const params = new URLSearchParams(url.search);
const paramsSeed = params.get("seed");

const router = createBrowserRouter([
  {
    path: "/",
    Component: Outlet,
    children: [
      // {
      //   path: "/score/:category/:lang",
      //   Component: Score,
      // },
      {
        path: "/:category/:lang",
        Component: App,
      },
      {
        path: "/:lang",
        element: <Navigate to={`/firstQuest/en?seed=${paramsSeed}`} />,
      },
      {
        path: "/",
        element: <Navigate to={`/firstQuest/en?seed=${paramsSeed}`} />,
      },
    ],
  },
]);

export const Z1BingoRoutes = () => {
  return <RouterProvider router={router} />;
};
