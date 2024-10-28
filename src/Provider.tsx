import {
  ChakraProvider,
  ColorModeScript,
  type ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
import { type StyleFunctionProps, mode } from "@chakra-ui/theme-tools";
import type { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
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

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
};
