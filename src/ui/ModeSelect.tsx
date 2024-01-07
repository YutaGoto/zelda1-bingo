import { Box, Button, Grid, Link, Text } from "@chakra-ui/react";
import { t } from "i18next";

interface ModeSelectProps {
  mode: "score" | "bingo" | "single";
  category: "firstQuest" | "secondQuest" | "swordless";
  lang: string | undefined;
  mt: number;
}

export const ModeSelect = ({ mode, lang, category, mt }: ModeSelectProps) => {
  return (
    <Box mt={mt}>
      <Text fontSize="lg">{t("mode")}</Text>
      <Grid
        templateColumns={{ lg: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={2}
        mt={2}
      >
        <Button
          as={Link}
          href={`/${category}/${lang}`}
          variant={mode === "bingo" ? "solid" : "outline"}
          colorScheme="cyan"
        >
          {t("bingo")}
        </Button>
        <Button
          as={Link}
          href={`/score/${category}/${lang}`}
          colorScheme="yellow"
          variant={mode === "score" ? "solid" : "outline"}
        >
          {t("score")}
        </Button>
        <Button
          // as={Link}
          isDisabled={true}
          // href={`/single/${category}/${lang}`}
          colorScheme="red"
          variant={mode === "single" ? "solid" : "outline"}
        >
          {t("singleTasking")}
        </Button>
      </Grid>
    </Box>
  );
};
