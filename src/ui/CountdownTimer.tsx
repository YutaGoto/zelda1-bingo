import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";

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

      <ButtonGroup>
        <Button
          variant="outline"
          colorScheme="cyan"
          onClick={() => handleStart()}
          isDisabled={isRunning}
        >
          Start
        </Button>
        <Button
          variant="outline"
          colorScheme="cyan"
          onClick={() => handlePause()}
        >
          Pause
        </Button>
        <Button
          variant="outline"
          colorScheme="yellow"
          onClick={() => handleReset()}
        >
          Reset
        </Button>
      </ButtonGroup>
    </Box>
  );
};
