import { useEffect, useRef, useState } from "react";

export const useStopwatch = (initialState = 0) => {
  const [elapsedTime, setElapsedTime] = useState<number>(initialState);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    const startTime = Date.now() - elapsedTime;
    intervalRef.current = window.setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
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
    setElapsedTime(0);
    setIsRunning(false);
  };

  return {
    elapsedTime,
    isRunning,
    handleStart,
    handlePause,
    handleReset,
  };
};
