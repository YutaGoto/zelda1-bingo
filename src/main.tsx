import {
  ChakraProvider,
  ColorModeScript,
  type ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource-variable/noto-sans-jp";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import App from "./App.tsx";
import Score from "./Score.tsx";
import "./i18n.ts";
import "./index.css";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  ...config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
      },
    }),
  },
  fonts: {
    heading: `'Noto Sans JP Variable', sans-serif`,
    body: `'Noto Sans JP Variable', sans-serif`,
  },
});

const url = new URL(location.href);
const params = new URLSearchParams(url.search);
const paramsSeed = params.get("seed");

const router = createBrowserRouter([
  {
    path: "/",
    Component: Outlet,
    children: [
      {
        path: "/score/:category/:lang",
        Component: Score,
      },
      {
        path: "/:category/:lang",
        Component: App,
      },
      {
        path: "/:lang",
        element: <Navigate to={`/firstQuest/en?seed=${paramsSeed}`} />},
      {
        path: "/",
        element: <Navigate to={`/firstQuest/en?seed=${paramsSeed}`} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <RouterProvider router={router} />
      <Analytics />
    </ChakraProvider>
  </React.StrictMode>,
);
