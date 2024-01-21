import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";

import { Counter } from "../Counter";

const setup = () => {
  const user = userEvent.setup();
  return { user };
};

test("Counter", () => {
  render(<Counter goal={1} marginTop={0} />);

  expect(screen.getByDisplayValue("0")).toBeTruthy();
  expect(screen.getByLabelText("increment")).toBeTruthy();
  expect(screen.getByLabelText("decrement")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(<Counter goal={2} marginTop={0} />);
  expect(asFragment()).toMatchSnapshot();
});

test("Increment", async () => {
  const { user } = setup();
  render(<Counter goal={1} marginTop={0} />);

  await user.click(screen.getByLabelText("increment"));
  expect(screen.getByDisplayValue("1")).toBeTruthy();
});

test("Decrement", async () => {
  const { user } = setup();
  render(<Counter goal={1} marginTop={0} />);

  await user.click(screen.getByLabelText("increment"));
  await user.click(screen.getByLabelText("decrement"));
  expect(screen.getByDisplayValue("0")).toBeTruthy();
});

test("not Increment over goal", async () => {
  const { user } = setup();
  render(<Counter goal={1} marginTop={0} />);

  await user.click(screen.getByLabelText("increment"));
  await user.click(screen.getByLabelText("increment"));
  expect(screen.getByDisplayValue("1")).toBeTruthy();
});
