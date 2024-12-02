import { Box, Grid, Link, Text } from "@chakra-ui/react";
import { t } from "i18next";

interface ModeSelectProps {
  mode: "score" | "bingo" | "single";
  category: "firstQuest" | "secondQuest" | "swordless";
  lang: string | undefined;
  mt?: number;
}

export const ModeSelect = ({
  mode,
  lang,
  category,
  mt = 0,
}: ModeSelectProps) => {
  return (
    <Box mt={mt}>
      <Text fontSize="lg">{t("mode")}</Text>
      <Grid
        templateColumns={{ lg: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={2}
        mt={2}
      >
        <Link
          as={Link}
          href={`/${category}/${lang}`}
          variant={mode === "bingo" ? "plain" : "underline"}
          colorScheme="cyan"
        >
          {t("bingo")}
        </Link>
        <Link
          href={`/score/${category}/${lang}`}
          colorScheme="yellow"
          variant={mode === "score" ? "plain" : "underline"}
        >
          {t("score")}
        </Link>
        {/* <Link
          href={`/single/${category}/${lang}`}
          colorScheme="red"
          variant={mode === "single" ? "plain" : "underline"}
        >
          {t("singleTasking")}
        </Link> */}
      </Grid>
    </Box>
  );
};
