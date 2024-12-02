import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SimpleGrid,
  Spacer,
  createListCollection,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCopy } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { Field } from "../components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "../components/ui/number-input";
import { Toaster, toaster } from "../components/ui/toaster";
import type { Z1Task } from "../types/Z1Task";
import { BingoCount } from "../ui/BingoCount";
import { CategorySelect } from "../ui/CategorySelect";
import { Contact } from "../ui/Contact";
import { ModeSelect } from "../ui/ModeSelect";
import { Sheet } from "../ui/Sheet";
import { Stopwatch } from "../ui/Stopwatch";
import { copyText } from "../utils/copyText";

interface BingoProps {
  category: "firstQuest" | "secondQuest" | "swordless";
  seed: number;
  taskList: Z1Task[];
}

const url = new URL(location.href);
const params = new URLSearchParams(url.search);

export const Bingo = ({ category, seed, taskList }: BingoProps) => {
  // const { colorMode, toggleColorMode } = useColorMode();
  const {
    handleSubmit,
    state,
    Field: FormField,
  } = useForm({
    defaultValues: {
      seed: seed,
    },
    onSubmit: ({ value }) => {
      if (value.seed === seed) return;

      navigate(`/${category}/${lang}?seed=${value.seed}`, {
        replace: true,
      });
      location.reload();
      return;
    },
    validatorAdapter: zodValidator(),
  });

  const languages = createListCollection({
    items: [
      { value: "ja", label: "日本語" },
      { value: "en", label: "English" },
    ],
  });

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
  const [messageLang, setMessageLang] = useState<string | undefined>(lang);

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

  const onChangeLang = (e: string[]) => {
    if (e[0] === lang) return;

    setMessageLang(e[0]);
    navigate(`/${category}/${e[0]}?seed=${seed}`);
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
            {t("Z1Bingo")}
          </Heading>

          <Heading as="h5" size="md" me={3}>
            {t(category)}
          </Heading>

          <Badge fontSize="1.2em" variant="subtle" colorPalette={"green"}>
            {seed}
          </Badge>
        </Flex>

        <Spacer />

        {/* <Box>
          <IconButton
            aria-label="change color mode"
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />
        </Box> */}
      </Box>

      <Box display={{ lg: "flex" }}>
        <Sheet
          taskList={taskList}
          hits={hits}
          lang={lang}
          messageLang={messageLang}
          toggle={toggle}
        />

        <Box mt={{ md: 5, lg: 0 }} ml={{ md: 0, lg: 6 }}>
          <Box mb={5}>
            <Stopwatch />
          </Box>

          <Box mb={5}>
            <BingoCount hits={hits} />
          </Box>

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

          <CategorySelect mode="bingo" lang={lang} category={category} mt={5} />
          <ModeSelect mode="bingo" lang={lang} category={category} mt={5} />

          <Contact mt={5} />
        </Box>
      </Box>
      <Toaster />
    </Container>
  );
};
