import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input, useNumberInput } from "@chakra-ui/react";

interface CounterProps {
  goal: number;
  marginTop: number;
}

export const Counter = ({ goal, marginTop }: CounterProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: goal,
    });

  const inc = getIncrementButtonProps({
    onClick: (e) => {
      e.stopPropagation();
    },
  });
  const dec = getDecrementButtonProps({
    onClick: (e) => {
      e.stopPropagation();
    },
  });
  const input = getInputProps({
    onClick: (e) => {
      e.stopPropagation();
    },
  });

  return (
    <HStack w="95px" marginTop={marginTop}>
      <IconButton
        aria-label="decrement"
        size="xs"
        {...dec}
        icon={<MinusIcon />}
      />
      <Input size="xs" {...input} />
      <IconButton
        aria-label="increment"
        size="xs"
        {...inc}
        icon={<AddIcon />}
      />
    </HStack>
  );
};
