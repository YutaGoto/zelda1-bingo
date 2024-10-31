import "@fontsource-variable/noto-sans-jp";

import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./i18n.ts";
import "./index.css";
import { Provider } from "./Provider.tsx";
import { Z1BingoRoutes } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Z1BingoRoutes />
      <Analytics />
    </Provider>
  </StrictMode>,
);
