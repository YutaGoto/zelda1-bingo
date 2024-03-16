import { Box, Button, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RiBox1Line, RiExternalLinkLine, RiTwitterXLine } from "react-icons/ri";
import { VscGithubAlt } from "react-icons/vsc";

interface ContactProps {
  mt: number;
}

export const Contact = ({ mt }: ContactProps) => {
  const { t } = useTranslation();
  return (
    <Box mt={mt}>
      <Text fontSize="lg">{t("contact")}</Text>
      <SimpleGrid columns={{ lg: 1, md: 3 }} spacing={2} mt={2}>
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
        <Button
          as={Link}
          variant="outline"
          href="https://bsky.app/profile/yougoto.dev"
          leftIcon={<RiBox1Line />}
          rightIcon={<RiExternalLinkLine />}
          isExternal
        >
          Bluesky
        </Button>
      </SimpleGrid>
    </Box>
  );
};
