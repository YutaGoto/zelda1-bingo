import { Box, Text, useColorMode } from "@chakra-ui/react";
import type { Z1Task } from "../types/Z1Task";
import { Counter } from "./Counter";

interface CellProps {
  task: Z1Task;
  hit: boolean;
  lang: string | undefined;
  messageLang: string | undefined;
  onClick: () => void;
}

export const Cell = ({ task, hit, lang, messageLang, onClick }: CellProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={hit ? (colorMode === "dark" ? "green.600" : "green.300") : ""}
      width={140}
      height={140}
      py={2}
      px={3}
      border="1px"
      onClick={onClick}
      whiteSpace="unset"
      className="cell"
    >
      <Text fontSize={14} wordBreak="break-word">
        {task.category === "message"
          ? task.name[messageLang === "en" ? messageLang : "ja"]
          : task.name[lang === "en" ? lang : "ja"]}
      </Text>
      {!!task.count && <Counter goal={task.count} marginTop={5} />}
    </Box>
  );
};
