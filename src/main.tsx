import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";

const theme = {
  config: {
    initialColorMode: "dark", // ダークモードをデフォルトに設定
    useSystemColorMode: false, // OSの設定を使わせない
  },
  styles: {
    global: {
      body: {
        backgroundColor: "gray.600",
      },
      h1: {
        color: "white",
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={extendTheme(theme)}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
);
