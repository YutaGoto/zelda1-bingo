import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { firstQuestTaskList } from "./constants/firstQuestTaskList";
// import { secondQuestTaskList } from "./constants/secondQuestTaskList";
// import { swordlessTaskList } from "./constants/swordlessTackList";
import { ScoreBoard } from "./ui/ScoreBoard";
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

function Score() {
  const { category } = useParams();
  const seed = useMemo(() => getRandomNum(params.get("seed")), []);

  // TODO: 他のカテゴリーを追加
  // const selectedCategory = useMemo(() => {
  //   switch (category) {
  //     case "secondQuest":
  //       return "secondQuest";
  //     default:
  //       return "firstQuest";
  //   }
  // }, [category]);

  const shuffledTaskList = useMemo(() => {
    switch (category) {
      default:
        return shuffle(firstQuestTaskList, seed);
    }
  }, [seed, category]);

  return (
    <div>
      <ScoreBoard
        category={"firstQuest"}
        seed={seed}
        taskList={shuffledTaskList.slice(0, 30)}
      />
    </div>
  );
}

export default Score;
