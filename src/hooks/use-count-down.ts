import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for countdown timer.
 * @param {number} initialDuration - The initial duration in seconds.
 * @returns {UseCountdownReturn} An object containing countdown state and control functions.
 * Property of Emydev
 */
interface UseCountdownReturn {
  timeLeft: number;
  isRunning: boolean;
  isCompleted: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  restartCountdown: () => void;
}

export const useCountdown = (initialDuration: number): UseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer helper
  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return clearTimer;
  }, [isRunning, timeLeft]);

  const startCountdown = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
      setIsCompleted(false);
    }
  }, [isRunning, timeLeft]);

  const resetCountdown = useCallback(() => {
    clearTimer();
    setTimeLeft(initialDuration);
    setIsRunning(false);
    setIsCompleted(false);
  }, [initialDuration]);

  const restartCountdown = useCallback(() => {
    clearTimer();
    setTimeLeft(initialDuration);
    setIsRunning(true);
    setIsCompleted(false);
  }, [initialDuration]);

  return {
    timeLeft,
    isRunning,
    isCompleted,
    startCountdown,
    resetCountdown,
    restartCountdown,
  };
};

export default useCountdown;
