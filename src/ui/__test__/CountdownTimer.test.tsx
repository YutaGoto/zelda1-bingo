import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";

import { CountdownTimer } from "../CountdownTimer";

const setup = () => {
  const user = userEvent.setup();
  return { user };
};

test("CountdownTimer", () => {
  render(<CountdownTimer />);
  expect(screen.getByText("Start")).toBeTruthy();
  expect(screen.getByText("Pause")).toBeTruthy();
  expect(screen.getByText("Reset")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(<CountdownTimer />);
  expect(asFragment()).toMatchSnapshot();
});

test("Start", async () => {
  const { user } = setup();
  render(<CountdownTimer />);

  await act(async () => {
    await user.click(screen.getByText("Start"));
    await new Promise((r) => setTimeout(r, 2000));
  });

  expect(screen.queryByText("0:15:00")).toBeNull();
});
