// import { StepperInput } from "../../../components/ui/stepper-input";
import { StepperInput } from "../components/ui/stepper-input";

interface CounterProps {
  goal: number;
}

export const Counter = ({ goal }: CounterProps) => {
  return (
    <StepperInput
      defaultValue="0"
      min={0}
      max={goal}
      onClick={(e) => e.stopPropagation()}
    />
  );
};
