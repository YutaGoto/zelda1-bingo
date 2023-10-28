import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Select,
  SimpleGrid,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { taskList } from "./utils/taskList";
import { shuffle } from "./utils/shuffle";

import { Counter } from "./ui/Counter";

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

const shuffledTaskList = shuffle(taskList, getRandomNum(paramsSeed));

function App() {
  const [hits, setHits] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);

  const { colorMode, toggleColorMode } = useColorMode();
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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

  const onChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === lang) return;

    navigate(`/zelda1-bingo/${e.target.value}/?seed=${params.get("seed")}`);
  };

  if (lang !== "ja" && lang !== "en") {
    navigate(`/zelda1-bingo/ja/?seed=${params.get("seed")}`);
    return
  }

  useEffect(() => {
    if (lang === "en") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ja");
    }
  }, [lang, i18n]);

  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Container maxW="2xl" marginTop={2}>
      <Heading as="h1" mb={3}>
        {t("Z1Bingo")}
      </Heading>
      <SimpleGrid id="bingoCard" columns={5}>
        {hits.map((row, i) => (
          <div key={i}>
            {row.map((hit, j) => (
              <Box
                key={j}
                bg={hit ? "green.600" : "gray.800"}
                width={140}
                height={140}
                py={2}
                px={3}
                border="1px"
                borderColor="white"
                color="white"
                onClick={() => toggle(i, j)}
                whiteSpace="unset"
                className="cell"
              >
                <Text fontSize={14} wordBreak="break-word">
                  {shuffledTaskList[i + j * 5].name[lang]}
                </Text>
                {!!shuffledTaskList[i + j * 5].count && (
                  <Counter goal={shuffledTaskList[i + j * 5].count || 0} />
                )}
              </Box>
            ))}
          </div>
        ))}
      </SimpleGrid>
      <Box mt={5} color="white">
        seed: {params.get("seed")}
      </Box>

      <Button mt={5} colorScheme="yellow" onClick={() => resetSeed()}>
        {t("resetSeed")}
      </Button>

      <Box mt={5} maxW="xs">
        <Select defaultValue={lang} onChange={(e) => onChangeLang(e)}>
          <option value="ja">日本語</option>
          <option value="en">English</option>
        </Select>
      </Box>
    </Container>
  );
}

export default App;
