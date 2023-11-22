import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { Bingo } from "./ui/Bingo";
import { firstQuestTaskList } from "./utils/firstQuestTaskList";
import { secondQuestTaskList } from "./utils/secondQuestTaskList";
import { shuffle } from "./utils/shuffle";

const url = new URL(location.href);
const params = new URLSearchParams(url.search);

function getRandomNum(seed: string | null): number {
  let currentSeed: number;
  if (seed === null) {
    currentSeed = Math.floor(Math.random() * 10000);
    params.append("seed", currentSeed.toString());
    history.replaceState("", "", `?${params.toString()}`);
  } else {
    currentSeed = Number(seed);
  }

  return currentSeed % 10000;
}

function App() {
  const { category } = useParams();
  const seed = useMemo(() => getRandomNum(params.get("seed")), []);
  const shuffledTaskList = useMemo(() => {
    if (category === "secondQuest") return shuffle(secondQuestTaskList, seed);

    return shuffle(firstQuestTaskList, seed);
  }, [seed, category]);

  return <Bingo seed={seed} taskList={shuffledTaskList} />;
}

export default App;
