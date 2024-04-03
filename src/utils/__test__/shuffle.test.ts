import { expect, test } from "vitest";
import { firstQuestTaskList } from "../../constants/firstQuestTaskList";
import type { Z1Task } from "../../types/Z1Task";
import { shuffle } from "../shuffle";

const clone = (arr: Z1Task[]) => JSON.parse(JSON.stringify(arr));

test("do shuffling", () => {
  const clonedArr = clone(firstQuestTaskList);
  const shuffledArr = shuffle(firstQuestTaskList, 1);
  expect(JSON.stringify(clonedArr)).not.toEqual(JSON.stringify(shuffledArr));
  expect(clonedArr.length).toEqual(shuffledArr.length);
});
