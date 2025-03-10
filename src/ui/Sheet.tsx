import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { TbBackslash } from "react-icons/tb";
import type { Z1Task } from "../types/Z1Task";
import { Cell } from "./Cell";

interface SheetProps {
  taskList: Z1Task[];
  hits: boolean[][];
  lang: string | undefined;
  messageLang: string | undefined;
  toggle: (i: number, j: number) => void;
}

export const Sheet = ({
  taskList,
  hits,
  lang,
  messageLang,
  toggle,
}: SheetProps) => {
  return (
    <Grid
      id="bingoCard"
      h={730}
      templateColumns="30px repeat(5, 140px)"
      gap={0}
    >
      <GridItem w={30} h={30} py={1} px={1} borderWidth="1px">
        <Center>
          <TbBackslash />
        </Center>
      </GridItem>
      {["A", "B", "C", "D", "E"].map((row) => (
        <GridItem key={row} w={140} h={30} py={1} px={2} borderWidth="1px">
          <Center>{row}</Center>
        </GridItem>
      ))}
      <Box>
        {[1, 2, 3, 4, 5].map((col) => (
          <GridItem key={col} w={30} h={140} py={1} px={2} borderWidth="1px">
            <Center>{col}</Center>
          </GridItem>
        ))}
      </Box>
      {hits.map((row, i) => (
        <GridItem key={i}>
          {row.map((hit, j) => (
            <Cell
              key={j}
              task={taskList[i + j * 5]}
              hit={hit}
              lang={lang}
              messageLang={messageLang}
              onClick={() => toggle(i, j)}
            />
          ))}
        </GridItem>
      ))}
    </Grid>
  );
};
