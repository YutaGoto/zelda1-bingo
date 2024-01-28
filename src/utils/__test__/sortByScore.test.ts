import { expect, test } from "vitest";
import {
  factoryZ1MessageTask,
  factoryZ1OtherTask,
  factoryZ1Task,
} from "../../__test__/factory/Z1Task";
import { sortByScore } from "../sortByScore";

test("sortByScore", () => {
  const sortedArr = sortByScore([
    factoryZ1Task, // 2
    factoryZ1OtherTask, // 5
    factoryZ1MessageTask, // 3
  ]);

  expect(sortedArr).toEqual([
    factoryZ1Task,
    factoryZ1MessageTask,
    factoryZ1OtherTask,
  ]);
});
