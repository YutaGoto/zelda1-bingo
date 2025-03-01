import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCopy } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { Checkbox } from "../components/ui/checkbox";
import { ColorModeButton } from "../components/ui/color-mode";
import { Field } from "../components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "../components/ui/number-input";
import { Toaster, toaster } from "../components/ui/toaster";
import type { Z1Task } from "../types/Z1Task";
import { CategorySelect } from "../ui/CategorySelect";
import { Contact } from "../ui/Contact";
import { CountdownTimer } from "../ui/CountdownTimer";
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

  // const { colorMode, toggleColorMode } = useColorMode();
  const {
    handleSubmit,
    state,
    Field: FormField,
  } = useForm({
    defaultValues: {
      seed: seed,
    },
    onSubmit: (values) => {
      if (values.value.seed === Number(seed)) return;

      navigate(`/score/${category}/${lang}?seed=${values.value.seed}`, {
        replace: true,
      });
      location.reload();
      return;
    },
  });

  const languages = createListCollection({
    items: [
      { value: "ja", label: "日本語" },
      { value: "en", label: "English" },
    ],
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

  const onChangeLang = (e: string[]) => {
    if (e[0] === lang) return;

    setMessageLang(e[0]);
    navigate(`/score/${category}/${e[0]}?seed=${seed}`);
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

          <Heading as="h5" size="sm" me={3}>
            {t(category)}
          </Heading>

          <Badge fontSize="1.2em" variant="subtle" colorPalette={"green"}>
            {seed}
          </Badge>
        </Flex>

        <Spacer />

        <Box>
          <ColorModeButton />
        </Box>
      </Box>

      <Box display={{ lg: "flex" }}>
        <Box>
          <Box>
            <Text fontSize="xl">
              {t("currentPoint")}: {currentPoint}pts
            </Text>
          </Box>
          <VStack align="stretch" marginTop={2}>
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
                    {!!task.count && <Counter goal={task.count} />}
                  </HStack>
                </Checkbox>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box mt={{ md: 5, lg: 0 }} ml={{ md: 0, lg: 6 }}>
          <Box>
            <CountdownTimer />
          </Box>

          <Box mt={2}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void handleSubmit();
              }}
            >
              <FormField
                name="seed"
                children={(field) => (
                  <Field label="Seed">
                    <NumberInputRoot
                      min={1}
                      max={9999}
                      name={field.name}
                      defaultValue={String(field.state.value)}
                      onValueChange={(e) => {
                        field.handleChange(Number(e.value));
                      }}
                    >
                      <NumberInputField />
                    </NumberInputRoot>
                  </Field>
                )}
              />

              <Button
                mt={5}
                fontWeight={"bold"}
                variant="outline"
                type="submit"
                colorPalette={"teal"}
              >
                {t("updateSeed")}
              </Button>
            </form>
            <Box mt={5}>
              <Button
                fontWeight={"bold"}
                colorPalette={"purple"}
                variant="outline"
                onClick={() => {
                  copyText(state.values.seed);
                  toaster.create({
                    title: t("copiedSeed"),
                    type: "success",
                  });
                }}
              >
                <FaCopy /> {t("copySeed")}
              </Button>
            </Box>
            <Box mt={5}>
              <Button
                fontWeight={"bold"}
                colorPalette={"purple"}
                variant="outline"
                onClick={() => {
                  copyText(location.href);
                  toaster.create({
                    title: t("copiedCurrentUrl"),
                    type: "success",
                  });
                }}
              >
                <FaCopy /> {t("copyCurrentUrl")}
              </Button>
            </Box>
            <Box mt={5}>
              <Button
                fontWeight={"bold"}
                colorPalette={"purple"}
                variant="outline"
                onClick={() => {
                  copyText(
                    `${location.href.replace(
                      `seed=${seed}`,
                      `seed=${state.values.seed}`,
                    )}`,
                  );
                  toaster.create({
                    title: t("copiedNewSeedUrl"),
                    type: "success",
                  });
                }}
              >
                <FaCopy /> {t("copyNewSeedUrl")}
              </Button>
            </Box>
            <Box mt={5}>
              <Button
                fontWeight={"bold"}
                colorPalette={"yellow"}
                variant="outline"
                onClick={() => resetSeed()}
              >
                <FaCopy /> {t("resetSeed")}
              </Button>
            </Box>

            <Spacer />

            <SimpleGrid columns={{ lg: 1, md: 2 }} gap={2} mt={5}>
              <SelectRoot
                onValueChange={(e) => onChangeLang(e.value)}
                collection={languages}
              >
                <SelectLabel>{t("language")}</SelectLabel>
                <SelectTrigger>
                  <SelectValueText>
                    {lang === "en" ? "English" : "日本語"}
                  </SelectValueText>
                </SelectTrigger>
                <SelectContent>
                  {languages.items.map((item) => (
                    <SelectItem key={item.value} item={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>

              <SelectRoot
                onValueChange={(e) => setMessageLang(e.value[0])}
                collection={languages}
              >
                <SelectLabel>{t("messageLanguage")}</SelectLabel>
                <SelectTrigger>
                  <SelectValueText>
                    {messageLang === "en" ? "English" : "日本語"}
                  </SelectValueText>
                </SelectTrigger>
                <SelectContent>
                  {languages.items.map((item) => (
                    <SelectItem key={item.value} item={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </SimpleGrid>

            <CategorySelect
              mode="score"
              lang={lang}
              category={category}
              mt={5}
            />
            <ModeSelect mode="score" lang={lang} category={category} mt={5} />

            <Contact mt={5} />
          </Box>
        </Box>
        <Toaster />
      </Box>
    </Container>
  );
};
