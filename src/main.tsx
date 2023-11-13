import {
  ChakraProvider,
  ColorModeScript,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App.tsx";
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
        path: "/:lang",
        Component: App,
      },
      {
        path: "/",
        element: <Navigate to={`/ja/?seed=${paramsSeed}`} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
