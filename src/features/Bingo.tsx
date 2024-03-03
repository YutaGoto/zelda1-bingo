import {
  CopyIcon,
  MoonIcon,
  RepeatIcon,
  Search2Icon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  NumberInput,
  NumberInputField,
  Select,
  Spacer,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import { Z1Task } from "../types/Z1Task";
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
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const form = useForm({
    defaultValues: {
      seed: seed,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      console.log(seed);
      if (value.seed === seed) return;

      navigate(`/${category}/${lang}/?seed=${value.seed}`, {
        replace: true,
      });
      location.reload();
      return;
    },
    validatorAdapter: zodValidator,
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

  const onChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === lang) return;

    setMessageLang(e.target.value);
    navigate(`/${category}/${e.target.value}/?seed=${seed}`);
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

          <Badge colorScheme="green" fontSize="1.2em" variant="subtle">
            {seed}
          </Badge>
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

          <CategorySelect mode="bingo" lang={lang} category={category} mt={5} />
          <ModeSelect mode="bingo" lang={lang} category={category} mt={5} />

          <Contact mt={5} />
        </Box>
      </Box>
    </Container>
  );
};
