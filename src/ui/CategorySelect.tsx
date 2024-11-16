import { Box, Grid, Link, Text } from "@chakra-ui/react";
import { t } from "i18next";

interface CategorySelectProps {
  mode: "score" | "bingo" | "single";
  category: "firstQuest" | "secondQuest" | "swordless";
  lang: string | undefined;
  mt?: number;
}

export const CategorySelect = ({
  mode,
  category,
  lang,
  mt = 0,
}: CategorySelectProps) => {
  const modePath = mode === "bingo" ? "" : `/${mode}`;
  return (
    <Box mt={mt}>
      <Text fontSize="lg">{t("otherCategories")}</Text>
      <Grid
        templateColumns={{ lg: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={2}
        mt={2}
      >
        <Link
          href={`${modePath}/firstQuest/${lang}`}
          variant={category === "firstQuest" ? "plain" : "underline"}
          colorScheme="blue"
        >
          1st Quest
        </Link>
        <Link
          href={`${modePath}/secondQuest/${lang}`}
          colorScheme="orange"
          variant={category === "secondQuest" ? "plain" : "underline"}
        >
          2nd Quest
        </Link>
        <Link
          href={`${modePath}/swordless/${lang}`}
          colorScheme="pink"
          variant={category === "swordless" ? "plain" : "underline"}
        >
          Swordless
        </Link>
      </Grid>
    </Box>
  );
};
