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
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { Z1Task } from "../types/Z1Task";
import { CategorySelect } from "../ui/CategorySelect";
import { Contact } from "../ui/Contact";
import { Counter } from "../ui/Counter";
import { ModeSelect } from "../ui/ModeSelect";
import { copyText } from "../utils/copyText";
import { sortByScore } from "../utils/sortByScore";

interface ScoreBoardProps {
  category: "firstQuest" | "secondQuest" | "swordless";
  seed: number;
  taskList: Z1Task[];
}

const url = new URL(location.href);
const params = new URLSearchParams(url.search);

export const ScoreBoard = ({ category, seed, taskList }: ScoreBoardProps) => {
  const sortedTasks = useMemo(() => {
    // 昇順に並び替える
    return sortByScore(taskList);
  }, [taskList]);

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const form = useForm({
    defaultValues: {
      seed: seed,
    },
    onSubmit: (values) => {
      if (values.value.seed === Number(seed)) return;

      navigate(`/score/${category}/${lang}/?seed=${values.value.seed}`, {
        replace: true,
      });
      location.reload();
      return;
    },
    validatorAdapter: zodValidator,
  });

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
            <form.Provider>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void form.handleSubmit();
                }}
              >
                <form.Field
                  name="seed"
                  validators={{
                    onBlur: z.number().int().min(1).max(9999),
                  }}
                  children={(field) => (
                    <FormControl isInvalid={field.state.meta.errors.length > 0}>
                      <FormLabel>Seed</FormLabel>
                      <NumberInput
                        name={field.name}
                        defaultValue={field.state.value}
                        min={1}
                        max={9999}
                      >
                        <NumberInputField
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          w={24}
                        />
                      </NumberInput>
                      <FormErrorMessage>
                        {field.state.meta.errors.join(", ")}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                />
                <form.Subscribe
                  selector={(state) => [state.isSubmitting]}
                  children={([isSubmitting]) => (
                    <Button
                      mt={5}
                      variant="outline"
                      colorScheme="teal"
                      leftIcon={<Search2Icon />}
                      type="submit"
                    >
                      {isSubmitting ? "..." : t("updateSeed")}
                    </Button>
                  )}
                />
              </form>
            </form.Provider>
            <Box mt={5}>
              <Button
                colorScheme="purple"
                variant="outline"
                leftIcon={<CopyIcon />}
                onClick={() => {
                  copyText(form.state.values.seed);
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
                      `seed=${form.state.values.seed}`,
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

          <CategorySelect mode="score" lang={lang} category={category} mt={5} />
          <ModeSelect mode="score" lang={lang} category={category} mt={5} />

          <Contact mt={5} />
        </Box>
      </Box>
    </Container>
  );
};
