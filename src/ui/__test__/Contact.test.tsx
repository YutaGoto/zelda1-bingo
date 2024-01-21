import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { Contact } from "../Contact";

test("Contact", () => {
  render(<Contact mt={0} />);

  expect(screen.getByText("contact")).toBeTruthy();
  expect(screen.getByText("X(Twitter)")).toBeTruthy();
  expect(screen.getByText("GitHub")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(<Contact mt={0} />);
  expect(asFragment()).toMatchSnapshot();
});
