import {
  CopyIcon,
  MoonIcon,
  RepeatIcon,
  Search2Icon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Link,
  NumberInput,
  NumberInputField,
  Select,
  Spacer,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RiExternalLinkLine, RiTwitterXLine } from "react-icons/ri";
import { TbBackslash } from "react-icons/tb";
import { VscGithubAlt } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";

import { Counter } from "./ui/Counter";
import { copyText } from "./utils/copyText";
import { shuffle } from "./utils/shuffle";
import { taskList } from "./utils/taskList";

interface SeedValue {
  seed: number;
}

const url = new URL(location.href);
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
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SeedValue>();

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
    location.reload();
  };

  const onChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === lang) return;

    navigate(`/${e.target.value}/?seed=${params.get("seed")}`);
  };

  const updateSeed: SubmitHandler<SeedValue> = (values) => {
    if (values.seed === Number(params.get("seed"))) return;

    navigate(`/${lang}/?seed=${values.seed}`, { replace: true });
    location.reload();
    return;
  };

  useEffect(() => {
    if (lang === "en") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ja");
    }
  }, [lang, i18n]);

  return (
    <Container maxW="container.lg" marginTop={2}>
      <Box display="flex">
        <Heading as="h1" mb={3}>
          {t("Z1Bingo")}
        </Heading>
        <Spacer />

        <Box>
          <IconButton
            aria-label="change color mode"
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />
        </Box>
      </Box>

      <Box display={{ lg: "flex" }}>
        <Grid
          id="bingoCard"
          maxW="3xl"
          templateColumns="30px repeat(5, 140px)"
          gap={0}
        >
          <Center width={30} height={30} py={1} px={1} border="1px">
            <TbBackslash />
          </Center>
          {["A", "B", "C", "D", "E"].map((row) => (
            <Center
              key={row}
              width={140}
              height={30}
              py={1}
              px={2}
              border="1px"
            >
              {row}
            </Center>
          ))}
          <Box>
            {[1, 2, 3, 4, 5].map((col) => (
              <Center
                key={col}
                width={30}
                height={140}
                py={1}
                px={2}
                border="1px"
              >
                {col}
              </Center>
            ))}
          </Box>
          {hits.map((row, i) => (
            <div key={i}>
              {row.map((hit, j) => (
                <Box
                  key={j}
                  bg={
                    hit
                      ? colorMode === "dark"
                        ? "green.600"
                        : "green.300"
                      : ""
                  }
                  width={140}
                  height={140}
                  py={2}
                  px={3}
                  border="1px"
                  onClick={() => toggle(i, j)}
                  whiteSpace="unset"
                  className="cell"
                >
                  <Text fontSize={14} wordBreak="break-word">
                    {
                      shuffledTaskList[i + j * 5].name[
                        lang === "en" ? lang : "ja"
                      ]
                    }
                  </Text>
                  {!!shuffledTaskList[i + j * 5].count && (
                    <Counter goal={shuffledTaskList[i + j * 5].count || 0} />
                  )}
                </Box>
              ))}
            </div>
          ))}
        </Grid>
        <Box mt={{ md: 5, lg: 0 }} ml={{ md: 0, lg: 6 }}>
          <form onSubmit={handleSubmit(updateSeed)}>
            <FormControl isInvalid={Boolean(errors.seed)}>
              <FormLabel>Seed</FormLabel>
              <NumberInput
                defaultValue={Number(params.get("seed"))}
                min={1}
                max={9999}
              >
                <NumberInputField
                  {...register("seed", {
                    required: t("requiredSeed"),
                    valueAsNumber: true,
                  })}
                  w={24}
                />
              </NumberInput>
              <FormErrorMessage>{errors.seed?.message}</FormErrorMessage>
            </FormControl>
            <Button
              mt={5}
              variant="outline"
              colorScheme="teal"
              leftIcon={<Search2Icon />}
              type="submit"
            >
              {t("updateSeed")}
            </Button>
          </form>
          <Box mt={5}>
            <Button
              colorScheme="purple"
              variant="outline"
              leftIcon={<CopyIcon />}
              onClick={() => {
                copyText(watch("seed"));
                toast({
                  title: t("copiedSeed"),
                  status: "success",
                  isClosable: true,
                });
              }}
            >
              {t("copySeed")}
            </Button>
          </Box>
          <Box mt={5}>
            <Button
              colorScheme="purple"
              variant="outline"
              leftIcon={<CopyIcon />}
              onClick={() => {
                copyText(location.href);
                toast({
                  title: t("copiedCurrentUrl"),
                  status: "success",
                  isClosable: true,
                });
              }}
            >
              {t("copyCurrentUrl")}
            </Button>
          </Box>
          <Box mt={5}>
            <Button
              colorScheme="purple"
              variant="outline"
              leftIcon={<CopyIcon />}
              onClick={() => {
                copyText(
                  `${location.href.replace(
                    `seed=${params.get("seed")}`,
                    `seed=${watch("seed")}`,
                  )}`,
                );
                toast({
                  title: t("copiedNewSeedUrl"),
                  status: "success",
                  isClosable: true,
                });
              }}
            >
              {t("copyNewSeedUrl")}
            </Button>
          </Box>
          <Box mt={5}>
            <Button
              colorScheme="yellow"
              variant="outline"
              leftIcon={<RepeatIcon />}
              onClick={() => resetSeed()}
            >
              {t("resetSeed")}
            </Button>
          </Box>

          <Box mt={5} maxW="xs">
            <FormControl>
              <FormLabel>{t("language")}</FormLabel>
              <Select
                defaultValue={lang}
                w={32}
                onChange={(e) => onChangeLang(e)}
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </Select>
            </FormControl>
          </Box>

          <Box mt={5}>
            <Text fontSize="lg">{t("otherCategories")}</Text>
            <Grid
              templateColumns={{ lg: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
              gap={2}
              mt={2}
            >
              <Button variant="outline" colorScheme="blue">
                1st Quest
              </Button>
              <Button
                // as={Link}
                colorScheme="orange"
                variant="outline"
                isDisabled={true}
              >
                2nd Quest
              </Button>
              <Button
                // as={Link}
                colorScheme="pink"
                variant="outline"
                isDisabled={true}
              >
                Swordless
              </Button>
              <Button
                // as={Link}
                colorScheme="cyan"
                variant="outline"
                isDisabled={true}
              >
                Randomizer
              </Button>
            </Grid>
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
