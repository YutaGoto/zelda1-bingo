import { Box, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  RiBlueskyLine,
  RiExternalLinkLine,
  RiTwitterXLine,
} from "react-icons/ri";
import { VscGithubAlt } from "react-icons/vsc";

interface ContactProps {
  mt: number;
}

export const Contact = ({ mt }: ContactProps) => {
  const { t } = useTranslation();
  return (
    <Box mt={mt}>
      <Text fontSize="lg">{t("contact")}</Text>
      <SimpleGrid columns={{ lg: 1, md: 3 }} gap={2} mt={2}>
        <Link
          variant="underline"
          href="https://github.com/YutaGoto/zelda1-bingo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VscGithubAlt /> GitHub <RiExternalLinkLine />
        </Link>
        <Link
          variant="underline"
          href="https://twitter.com/gggooottto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiTwitterXLine /> X(Twitter) <RiExternalLinkLine />
        </Link>
        <Link
          variant="underline"
          href="https://bsky.app/profile/yougoto.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiBlueskyLine /> Bluesky <RiExternalLinkLine />
        </Link>
      </SimpleGrid>
    </Box>
  );
};
