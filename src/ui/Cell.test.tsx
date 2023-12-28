import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { Cell } from "./Cell";

test("Cell false", () => {
  render(
    <Cell
      task={{
        name: {
          ja: "てすと",
          en: "test",
        },
        category: "demo",
      }}
      hit={false}
      lang="en"
      messageLang="en"
      onClick={() => {}}
    />,
  );

  expect(screen.getByText("test")).toBeTruthy();
});
