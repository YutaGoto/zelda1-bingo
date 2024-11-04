import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: {
          value: `'Noto Sans JP Variable', sans-serif`,
        },
        body: {
          value: `'Noto Sans JP Variable', sans-serif`,
        },
      },
    },
  },
});
