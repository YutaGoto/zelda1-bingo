import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import { Cell } from "../Cell";

const setup = () => {
  const user = userEvent.setup();
  return { user };
};

test("English Cell", () => {
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

test("Japanese Cell", () => {
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
      lang="ja"
      messageLang="ja"
      onClick={() => {}}
    />,
  );

  expect(screen.getByText("てすと")).toBeTruthy();
});

test("English Cell with Japanese message", () => {
  render(
    <Cell
      task={{
        name: {
          ja: "てすと",
          en: "test",
        },
        category: "message",
      }}
      hit={false}
      lang="ja"
      messageLang="en"
      onClick={() => {}}
    />,
  );

  expect(screen.getByText("test")).toBeTruthy();
});

test("Japanese Cell with English message", () => {
  render(
    <Cell
      task={{
        name: {
          ja: "てすと",
          en: "test",
        },
        category: "message",
      }}
      hit={false}
      lang="ja"
      messageLang="en"
      onClick={() => {}}
    />,
  );

  expect(screen.getByText("test")).toBeTruthy();
});

test("on click then hit", async () => {
  const { user } = setup();
  const onClick = vi.fn();
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
      onClick={onClick}
    />,
  );

  await waitFor(() => user.click(screen.getByText("test")));
  expect(onClick).toBeCalled();
});
