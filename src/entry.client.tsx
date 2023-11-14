import { ChakraProvider, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/styled-system";
import { ColorModeScript } from "@chakra-ui/system";
import { mode } from "@chakra-ui/theme-tools";
import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

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

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <RemixBrowser />
      </ChakraProvider>
    </StrictMode>,
  );
});
