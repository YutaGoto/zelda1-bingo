import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";

import "./i18n.ts";
import "./index.css";

import {
  ChakraProvider,
  ColorModeScript,
  StyleFunctionProps,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { withEmotionCache } from "@emotion/react";
import { LinksFunction } from "@remix-run/node";
import { useContext, useEffect } from "react";
import { ClientStyleContext } from "./context";

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { title: "Zelda1 Bingo" },
  { viewport: "width=device-width,initial-scale=1" },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/sword.png",
      type: "image/png",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

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

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      // biome-ignore lint/complexity/noForEach: <explanation>
      tags.forEach((tag) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Analytics />
        </body>
      </html>
    );
  },
);

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
