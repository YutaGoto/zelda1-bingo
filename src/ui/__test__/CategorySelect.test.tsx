import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { CategorySelect } from "../CategorySelect";

describe("Category Select languages", () => {
  test("title is English", () => {
    render(<CategorySelect mode="bingo" category="firstQuest" lang="en" />);
    expect(screen.getByText("Other Categories")).toBeTruthy();
  });
});

describe("active category", () => {
  test("1st quest", () => {
    const { asFragment } = render(
      <CategorySelect mode="score" category="firstQuest" lang="en" />,
    );

    expect(screen.getByText("1st Quest")).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test("2nd quest", () => {
    const { asFragment } = render(
      <CategorySelect mode="score" category="secondQuest" lang="en" />,
    );

    expect(screen.getByText("2nd Quest")).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  test("swordless", () => {
    const { asFragment } = render(
      <CategorySelect mode="bingo" category="swordless" lang="en" />,
    );

    expect(screen.getByText("Swordless")).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
