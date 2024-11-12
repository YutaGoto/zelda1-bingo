import {
  Badge,
  Box,
  Container,
  Fieldset,
  Flex,
  HStack,
  Heading,
  Input,
  NumberInput,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCopy, FaSearch } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";

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
  const { handleSubmit, state, Field, Subscribe } = useForm({
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
    validatorAdapter: zodValidator(),
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
    navigate(`/score/${category}/${e.target.value}?seed=${seed}`);
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

          <Badge colorScheme="green" fontSize="1.2em" variant="subtle">
            {seed}
          </Badge>
        </Flex>

        <Spacer />

        <Box>
          {/* <IconButton
            aria-label="change color mode"
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          /> */}
        </Box>
      </Box>

      <Box display={{ lg: "flex" }}>
        <Box>
          <Box>
            <Text fontSize="xl">
              {t("currentPoint")}: {currentPoint}pts
            </Text>
          </Box>
          <VStack align="stretch">
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
            <CountdownTimer />
          </Box>

          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void handleSubmit();
              }}
            >
              <Field
                name="seed"
                validators={{
                  onBlur: z.number().int().min(1).max(9999),
                }}
                children={(field) => (
                  <Fieldset.Content>
                    <Field
                      name="seed"
                      invalid={field.state.meta.errors.length > 0}
                    >
                      <Input
                        type="number"
                        name={field.name}
                        defaultValue={String(field.state.value)}
                        min={1}
                        max={9999}
                      />
                    </Field>

                    <Fieldset.HelperText>
                      {field.state.meta.errors.join(", ")}
                    </Fieldset.HelperText>
                  </Fieldset.Content>
                )}
              />
              <Subscribe
                selector={(state) => [state.isSubmitting]}
                children={([isSubmitting]) => (
                  <Button
                    mt={5}
                    variant="outline"
                    colorScheme="teal"
                    type="submit"
                  >
                    {isSubmitting ? (
                      "..."
                    ) : (
                      <>
                        <FaSearch /> {t("updateSeed")}
                      </>
                    )}
                  </Button>
                )}
              />
            </form>
            <Box mt={5}>
              <Button
                colorScheme="purple"
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
                colorScheme="purple"
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
                colorScheme="purple"
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
                colorScheme="yellow"
                variant="outline"
                onClick={() => resetSeed()}
              >
                <FaRepeat /> {t("resetSeed")}
              </Button>
            </Box>
          </Box>

          <Spacer />

          <SimpleGrid columns={{ lg: 1, md: 2 }} spacing={2} mt={5}>
            <FormControl>
              <Fieldset.Legend>{t("language")}</Fieldset.Legend>
              <Select defaultValue={lang} onChange={(e) => onChangeLang(e)}>
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </Select>
            </FormControl>
            <FormControl>
              <Fieldset.Legend>{t("messageLanguage")}</Fieldset.Legend>
              <Select
                value={messageLang}
                onChange={(e) => setMessageLang(e.target.value)}
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </Select>
            </FormControl>
          </SimpleGrid>

          <CategorySelect mode="score" lang={lang} category={category} mt={5} />
          <ModeSelect mode="score" lang={lang} category={category} mt={5} />

          <Contact mt={5} />
        </Box>
      </Box>
    </Container>
  );
};
