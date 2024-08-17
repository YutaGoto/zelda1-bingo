import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface BingoCountProps {
  hits: boolean[][];
}

export const BingoCount = ({ hits }: BingoCountProps) => {
  const { t } = useTranslation();
  const [bingoCount, setBingoCount] = useState<number>(0);

  useEffect(() => {
    let newBingoCount = hits.reduce((acc, row) => {
      if (row.every((hit) => hit)) {
        return acc + 1;
      }

      return acc;
    }, 0);

    newBingoCount += hits.reduce((acc, _row, i) => {
      return acc + (hits.map((row) => row[i]).every((hit) => hit) ? 1 : 0);
    }, 0);

    if (hits[0][0] && hits[1][1] && hits[2][2] && hits[3][3] && hits[4][4]) {
      newBingoCount += 1;
    }

    if (hits[0][4] && hits[1][3] && hits[2][2] && hits[3][1] && hits[4][0]) {
      newBingoCount += 1;
    }

    setBingoCount(newBingoCount);
  }, [hits]);

  return (
    <Text fontSize="2xl" className="bingo-count">
      {t("bingoCount", { count: bingoCount })}
    </Text>
  );
};
