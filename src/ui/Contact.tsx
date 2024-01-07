import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RiExternalLinkLine, RiTwitterXLine } from "react-icons/ri";
import { VscGithubAlt } from "react-icons/vsc";

interface ContactProps {
  mt: number;
}

export const Contact = ({ mt }: ContactProps) => {
  const { t } = useTranslation();
  return (
    <Box mt={mt}>
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
  );
};
