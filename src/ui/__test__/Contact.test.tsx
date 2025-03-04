import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { Provider } from "../../Provider";
import { Contact } from "../Contact";

test("Contact", () => {
  render(<Contact mt={0} />, { wrapper: Provider });

  expect(screen.getByText("Contact")).toBeTruthy();
  expect(screen.getByText("X(Twitter)")).toBeTruthy();
  expect(screen.getByText("GitHub")).toBeTruthy();
  expect(screen.getByText("Bluesky")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(<Contact mt={0} />, { wrapper: Provider });
  expect(asFragment()).toMatchSnapshot();
});
