import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { Provider } from "../../Provider";
import { BingoCount } from "../BingoCount";

test("BingoCount", () => {
  render(
    <BingoCount
      hits={[
        [true, false, false, false, false],
        [false, true, false, false, false],
        [false, false, true, false, false],
        [false, false, false, true, false],
        [false, false, false, false, true],
      ]}
    />,
    { wrapper: Provider },
  );

  expect(screen.getByText("1 line Bingo")).toBeTruthy();
});

test("Snapshot", () => {
  const { asFragment } = render(
    <BingoCount
      hits={[
        [true, false, false, false, false],
        [false, true, false, false, false],
        [false, false, true, false, false],
        [false, false, false, true, false],
        [false, false, false, false, true],
      ]}
    />,
    { wrapper: Provider },
  );

  expect(asFragment()).toMatchSnapshot();
});
