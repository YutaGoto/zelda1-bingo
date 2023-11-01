import React from "react";
import ReactDOM from "react-dom/client";
import {
  ChakraProvider,
  ColorModeScript,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

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
        element: <Navigate to="/ja" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme({ config })}>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
