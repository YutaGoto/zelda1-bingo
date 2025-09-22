import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  factoryZ1MessageTask,
  factoryZ1Task,
} from "../../__test__/factory/Z1Task";
import { Provider } from "../../Provider";
import { Cell } from "../Cell";

const setup = () => {
  const user = userEvent.setup();
  return { user };
};

test("English Cell", () => {
  render(
    <Cell
      task={factoryZ1Task}
      hit={false}
      lang="en"
      messageLang="en"
      onClick={() => {}}
    />,
    { wrapper: Provider },
  );

  expect(screen.getByText("test")).toBeTruthy();
});

test("Japanese Cell", () => {
  render(
    <Cell
      task={factoryZ1Task}
      hit={false}
      lang="ja"
      messageLang="ja"
      onClick={() => {}}
    />,
    { wrapper: Provider },
  );

  expect(screen.getByText("テスト")).toBeTruthy();
});

test("English Cell with Japanese message", () => {
  render(
    <Cell
      task={factoryZ1Task}
      hit={false}
      lang="ja"
      messageLang="en"
      onClick={() => {}}
    />,
    { wrapper: Provider },
  );

  expect(screen.getByText("テスト")).toBeTruthy();
});

test("Japanese Cell with English message", () => {
  render(
    <Cell
      task={factoryZ1MessageTask}
      hit={false}
      lang="ja"
      messageLang="en"
      onClick={() => {}}
    />,
    { wrapper: Provider },
  );

  expect(screen.getByText("test")).toBeTruthy();
});

test("on click then hit", async () => {
  const { user } = setup();
  const onClick = vi.fn();
  render(
    <Cell
      task={factoryZ1Task}
      hit={false}
      lang="en"
      messageLang="en"
      onClick={onClick}
    />,
    { wrapper: Provider },
  );

  await waitFor(() => user.click(screen.getByText("test")));
  expect(onClick).toBeCalled();
});
