import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";

import { Provider } from "../../Provider";
import { Stopwatch } from "../Stopwatch";

const setup = () => {
  const user = userEvent.setup();
  return { user };
};

test("Stopwatch", () => {
  render(<Stopwatch />, { wrapper: Provider });

  expect(screen.getByText("Start")).toBeTruthy();
  expect(screen.getByText("Pause")).toBeTruthy();
  expect(screen.getByText("Reset")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(<Stopwatch />, { wrapper: Provider });
  expect(asFragment()).toMatchSnapshot();
});

test("Start", async () => {
  const { user } = setup();
  render(<Stopwatch />, { wrapper: Provider });

  await act(async () => {
    await user.click(screen.getByText("Start"));
    await new Promise((r) => setTimeout(r, 2000));
  });

  expect(screen.queryByText("0:00:00.000")).toBeNull();
});
