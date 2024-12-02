import { Box, Button, Group, Text } from "@chakra-ui/react";

import { convertToTime } from "../utils/convertToTime";
import { useCountdownTimer } from "../utils/useCountdownTimer";

export const CountdownTimer = () => {
  const { time, handleStart, handlePause, handleReset, isRunning } =
    useCountdownTimer({ initialTimeMinutes: 15 });

  return (
    <Box>
      <Box mb={1}>
        <Text fontSize="4xl" color={time === 0 ? "orange" : "default"}>
          {convertToTime({ time: time * 1000, isMillisecond: false })}
        </Text>
      </Box>

      <Group>
        <Button
          variant="outline"
          colorPalette="cyan"
          fontWeight={"bold"}
          onClick={() => handleStart()}
          disabled={isRunning}
        >
          Start
        </Button>
        <Button
          variant="outline"
          colorPalette="cyan"
          fontWeight={"bold"}
          onClick={() => handlePause()}
        >
          Pause
        </Button>
        <Button
          variant="outline"
          colorPalette="yellow"
          fontWeight={"bold"}
          onClick={() => handleReset()}
        >
          Reset
        </Button>
      </Group>
    </Box>
  );
};
