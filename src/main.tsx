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

import "./i18n.ts";
import "./index.css";
import { Z1BingoRoutes } from "./routes";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <Z1BingoRoutes />
      <Analytics />
    </ChakraProvider>
  </React.StrictMode>,
);
