import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ModeSelect } from "../ModeSelect";

describe("Mode select languages", () => {
  test("title is English", () => {
    render(<ModeSelect mode="bingo" category="firstQuest" lang="en" />);

    expect(screen.getByText("Mode")).toBeTruthy();
  });
});

describe("active mode", () => {
  test("bingo", () => {
    const { asFragment } = render(
      <ModeSelect mode="bingo" category="swordless" lang="en" />,
    );

    expect(screen.getByText("Bingo")).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test("score attack", () => {
    const { asFragment } = render(
      <ModeSelect mode="score" category="firstQuest" lang="en" />,
    );

    expect(screen.getByText("Score Attack")).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  // test("single tasking", () => {
  //   render(<ModeSelect mode="tasking" category="firstQuest" lang="en" />);

  //   expect(screen.getByText("1st Quest")).toBeTruthy();
  // });
});
