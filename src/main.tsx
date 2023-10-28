import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Outlet,
    children: [
      {
        path: "/:app/:lang/*",
        Component: App,
      },
      {
        path: "/:app/*",
        element: <Navigate to="/zelda1-bingo/ja" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme(theme)}>
      <RouterProvider router={router} />
    </ChakraProvider>
    ,
  </React.StrictMode>,
);
