import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";

import { Stopwatch } from "../Stopwatch";

const setup = () => {
  const user = userEvent.setup();
  return { user };
};

test("Stopwatch", () => {
  render(<Stopwatch />);

  expect(screen.getByText("Start")).toBeTruthy();
  expect(screen.getByText("Pause")).toBeTruthy();
  expect(screen.getByText("Reset")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(<Stopwatch />);
  expect(asFragment()).toMatchSnapshot();
});

test("Start", async () => {
  const { user } = setup();
  render(<Stopwatch />);

  await user.click(screen.getByText("Start"));
  expect(screen.queryByText("0:00:00.000")).toBeNull();
});
