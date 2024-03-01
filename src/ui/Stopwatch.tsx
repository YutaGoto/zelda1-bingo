import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";

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
