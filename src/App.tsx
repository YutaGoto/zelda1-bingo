import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { VscGithubAlt } from "react-icons/vsc";
import { RiTwitterXLine, RiExternalLinkLine } from "react-icons/ri";
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

    navigate(`/${e.target.value}/?seed=${params.get("seed")}`);
  };

  if (lang !== "ja" && lang !== "en") {
    navigate(`/ja/?seed=${params.get("seed")}`);
    return;
  }

  useEffect(() => {
    if (lang === "en") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ja");
    }
  }, [lang, i18n]);

  return (
    <Container maxW="container.lg" marginTop={2}>
      <Heading as="h1" mb={3}>
        {t("Z1Bingo")}
      </Heading>

      <Box display={{ lg: "flex" }}>
        <SimpleGrid id="bingoCard" maxW="2xl" columns={5} flexShrink={0}>
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
        <Box mt={{ md: 5, lg: 0 }} ml={{ md: 0, lg: 12 }}>
          <Box color="white">seed: {params.get("seed")}</Box>

          <Button mt={5} colorScheme="yellow" onClick={() => resetSeed()}>
            {t("resetSeed")}
          </Button>

          <Box mt={5} maxW="xs">
            <Select defaultValue={lang} onChange={(e) => onChangeLang(e)}>
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </Select>
          </Box>

          <Box mt={5}>
            <Text fontSize="lg">{t("contact")}</Text>
            <Flex gap={2} mt={2}>
              <Button
                as={Link}
                variant="outline"
                href="https://github.com/YutaGoto/zelda1-bingo"
                leftIcon={<VscGithubAlt />}
                rightIcon={<RiExternalLinkLine />}
                isExternal
              >
                GitHub
              </Button>
              <Button
                as={Link}
                variant="outline"
                href="https://twitter.com/gggooottto"
                leftIcon={<RiTwitterXLine />}
                rightIcon={<RiExternalLinkLine />}
                isExternal
              >
                X(Twitter)
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
