import { StepperInput } from "../components/ui/stepper-input";

interface CounterProps {
  goal: number;
}

export const Counter = ({ goal }: CounterProps) => {
  return (
    <StepperInput
      mt={1}
      size="xs"
      defaultValue="0"
      min={0}
      max={goal}
      onClick={(e) => e.stopPropagation()}
    />
  );
};
