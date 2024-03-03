import { useRef, useState } from "react";

interface CountDownTimerProps {
  initialTimeMinutes: number;
}

export const useCountdownTimer = ({
  initialTimeMinutes,
}: CountDownTimerProps) => {
  const [time, setTime] = useState<number>(initialTimeMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const handleStart = () => {
    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIsRunning(true);
  };

  const handlePause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(initialTimeMinutes * 60);
    setIsRunning(false);
  };

  return {
    time,
    isRunning,
    handleStart,
    handlePause,
    handleReset,
  };
};
