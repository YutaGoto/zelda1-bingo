import { ChakraProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";

import { ColorModeProvider } from "./components/ui/color-mode";
import { system, theme } from "./theme";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider theme={theme}>{children}</ColorModeProvider>
    </ChakraProvider>
  );
};
