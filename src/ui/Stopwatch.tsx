import { Box, Button, Group, Text } from "@chakra-ui/react";

import { convertToTime } from "../utils/convertToTime";
import { useStopwatch } from "../utils/useStopwatch";

export const Stopwatch = () => {
  const { elapsedTime, handleStart, handlePause, handleReset, isRunning } =
    useStopwatch();

  return (
    <Box>
      <Box mb={1}>
        <Text fontSize="4xl">{convertToTime({ time: elapsedTime })}</Text>
      </Box>

      <Group>
        <Button
          variant="outline"
          colorScheme="cyan"
          onClick={() => handleStart()}
          disabled={isRunning}
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
      </Group>
    </Box>
  );
};
