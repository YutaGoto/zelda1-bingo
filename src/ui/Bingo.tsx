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
import { VscGithubAlt } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";

import { Z1Task } from "../types/Z1Task";
import { copyText } from "../utils/copyText";
import { Sheet } from "./Sheet";

interface BingoProps {
  seed: number;
  taskList: Z1Task[];
}

interface SeedValue {
  seed: number;
}

const url = new URL(location.href);
const params = new URLSearchParams(url.search);

export const Bingo = ({ seed, taskList }: BingoProps) => {
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

  const { category, lang } = useParams();
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

  const updateSeed: SubmitHandler<SeedValue> = (values) => {
    if (values.seed === Number(seed)) return;

    navigate(`/${category}/${lang}/?seed=${values.seed}`, { replace: true });
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
        <Sheet
          taskList={taskList}
          hits={hits}
          lang={lang}
          messageLang={messageLang}
          toggle={toggle}
        />

        <Box mt={{ md: 5, lg: 0 }} ml={{ md: 0, lg: 6 }}>
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

          <Box mt={5}>
            <Text fontSize="lg">{t("otherCategories")}</Text>
            <Grid
              templateColumns={{ lg: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
              gap={2}
              mt={2}
            >
              <Button
                as={Link}
                href={`/firstQuest/${lang}`}
                variant={category === "firstQuest" ? "solid" :  "outline"}
                colorScheme="blue"
              >
                1st Quest
              </Button>
              <Button
                as={Link}
                href={`/secondQuest/${lang}`}
                colorScheme="orange"
                variant={category === "secondQuest" ? "solid" :  "outline"}

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
};
