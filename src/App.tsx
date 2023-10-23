import { useState } from "react";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { boardList } from "./utils/boardList";
import { shuffle } from "./utils/shuffle";

import "./App.css";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const paramsSeed = params.get("seed");

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

const shuffledBoardList = shuffle(boardList, getRandomNum(paramsSeed));

function App() {
  const [hits, setHits] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);

  const toggle = (i: number, j: number) => {
    const newHits = [...hits];
    newHits[i][j] = !newHits[i][j];
    setHits(newHits);
  };

  const resetSeed = () => {
    setHits([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]);

    params.delete("seed");
    history.replaceState("", "", `?${params.toString()}`);
    window.location.reload();
  };

  return (
    <>
      <Heading as="h1" mb={3}>
        Zelda1 Bingo Card
      </Heading>
      <SimpleGrid id="bingoCard" columns={5}>
        {hits.map((row, i) => (
          <div key={i}>
            {row.map((hit, j) => (
              <Box
                key={j}
                bg={hit ? "green.600" : "gray.600"}
                width={140}
                height={140}
                p={2}
                border="1px"
                borderColor="white"
                color="white"
                onClick={() => toggle(i, j)}
                className="cell"
              >
                {shuffledBoardList[i + j * 5].name}
              </Box>
            ))}
          </div>
        ))}
      </SimpleGrid>
      <Box mt={5} color="white">
        seed: {params.get("seed")}
      </Box>

      <Button mt={5} colorScheme="yellow" onClick={() => resetSeed()}>
        reset seed
      </Button>
    </>
  );
}

export default App;
