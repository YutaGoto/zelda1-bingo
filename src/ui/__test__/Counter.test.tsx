import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";

import { Provider } from "../../Provider";
import { Counter } from "../Counter";

const setup = () => {
  const user = userEvent.setup();
  return { user };
};

test("Counter", () => {
  render(<Counter goal={1} />, { wrapper: Provider });

  expect(screen.findAllByText("0")).toBeTruthy();
  expect(screen.getByLabelText("increment value")).toBeTruthy();
  expect(screen.getByLabelText("decrease value")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(<Counter goal={2} />, { wrapper: Provider });
  expect(asFragment()).toMatchSnapshot();
});

test("Increment", async () => {
  const { user } = setup();
  render(<Counter goal={1} />, { wrapper: Provider });

  await user.click(screen.getByLabelText("increment value"));
  expect(screen.findAllByText("1")).toBeTruthy();
});

test("Decrement", async () => {
  const { user } = setup();
  render(<Counter goal={1} />, { wrapper: Provider });

  await user.click(screen.getByLabelText("increment value"));
  await user.click(screen.getByLabelText("decrease value"));
  expect(screen.findAllByText("0")).toBeTruthy();
});

test("not Increment over goal", async () => {
  const { user } = setup();
  render(<Counter goal={1} />, { wrapper: Provider });

  await user.click(screen.getByLabelText("increment value"));
  await user.click(screen.getByLabelText("increment value"));
  expect(screen.findAllByText("1")).toBeTruthy();
});
