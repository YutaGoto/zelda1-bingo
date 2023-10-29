import type { Z1Task } from "../types/Z1Task";

export function shuffle(array: Z1Task[], seed: number) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  let tmpSeed = seed || 1;
  const random = function () {
    const x = Math.sin(tmpSeed++) * 10000;
    return x - Math.floor(x);
  };
  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
