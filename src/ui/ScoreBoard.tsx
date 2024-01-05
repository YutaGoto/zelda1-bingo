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
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  NumberInput,
  NumberInputField,
  Select,
  Spacer,
  StackDivider,
  Text,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Z1Task } from "../types/Z1Task";
import { copyText } from "../utils/copyText";
import { Contact } from "./Contact";
import { Counter } from "./Counter";

interface ScoreBoardProps {
  category: "firstQuest";
  seed: number;
  taskList: Z1Task[];
}

interface SeedValue {
  seed: number;
}

const url = new URL(location.href);
const params = new URLSearchParams(url.search);

export const ScoreBoard = ({ category, seed, taskList }: ScoreBoardProps) => {
  const sortedTasks = useMemo(() => {
    // 昇順に並び替える
    return taskList.sort((a, b) => {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0;
    });
  }, [taskList]);

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SeedValue>();

  const [hits, setHits] = useState<boolean[]>(new Array(20).fill(false));
  const [currentPoint, setCurrentPoint] = useState(0);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const [messageLang, setMessageLang] = useState<string | undefined>(lang);

  const toggle = (i: number) => {
    const newHits = [...hits];
    newHits[i] = !newHits[i];
    setCurrentPoint(
      newHits.reduce((acc, cur, i) => {
        if (cur) {
          return acc + sortedTasks[i].score;
        }
        return acc;
      }, 0),
    );
    setHits(newHits);
  };

  const resetSeed = () => {
    setHits(new Array(20).fill(false));
    params.delete("seed");
    history.replaceState("", "", `?${params.toString()}`);
    location.reload();
  };

  const onChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === lang) return;

    setMessageLang(e.target.value);
    navigate(`/score/${category}/${e.target.value}/?seed=${seed}`);
  };

  const updateSeed: SubmitHandler<SeedValue> = (values) => {
    if (values.seed === Number(seed)) return;

    navigate(`/score/${category}/${lang}/?seed=${values.seed}`, {
      replace: true,
    });
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
        <Flex minWidth="max-content" alignItems="end" mb={3}>
          <Heading as="h1" me={3}>
            {t("Z1ScoreBoard")}
          </Heading>

          <Heading as="h5" size="sm">
            {t(category)}
          </Heading>
        </Flex>

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
        <Box>
          <Box>
            <Text fontSize="xl">
              {t("currentPoint")}: {currentPoint}pts
            </Text>
          </Box>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
            marginTop={2}
            align="stretch"
          >
            {sortedTasks.map((task, i) => (
              <Box key={task.name.en}>
                <Checkbox onChange={() => toggle(i)}>
                  <HStack alignItems="center">
                    <Box>
                      {task.score}pts:{" "}
                      {task.category === "message"
                        ? task.name[messageLang === "en" ? messageLang : "ja"]
                        : task.name[lang === "en" ? lang : "ja"]}
                    </Box>{" "}
                    {!!task.count && (
                      <Counter goal={task.count} marginTop={0} />
                    )}
                  </HStack>
                </Checkbox>
              </Box>
            ))}
          </VStack>
        </Box>
        <Spacer />
        <Box mt={{ md: 5, lg: 0 }} ml={{ md: 0, lg: 6 }}>
          <Box>
            <form onSubmit={handleSubmit(updateSeed)}>
              <FormControl isInvalid={Boolean(errors.seed)}>
                <FormLabel>Seed</FormLabel>
                <NumberInput defaultValue={Number(seed)} min={1} max={9999}>
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
                      `seed=${seed}`,
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
          </Box>

          <Spacer />

          <Box mt={5}>
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
            <FormControl mt={2}>
              <FormLabel>{t("messageLanguage")}</FormLabel>
              <Select
                value={messageLang}
                w={32}
                onChange={(e) => setMessageLang(e.target.value)}
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </Select>
            </FormControl>
          </Box>

          <Contact mt={5} />
        </Box>
      </Box>
    </Container>
  );
};
