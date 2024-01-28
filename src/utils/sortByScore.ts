import type { Z1Task } from "../types/Z1Task";

export const sortByScore = (array: Z1Task[]) => {
  return array.sort((a, b) => {
    if (a.score > b.score) return 1;
    if (a.score < b.score) return -1;

    return 0;
  });
};
