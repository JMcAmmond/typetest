import { useCallback, useState } from "react";

export const useTimerManager = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isTiming, setIsTiming] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const initializeTimer = useCallback((length: number) => {
    let dur = length;
    const timer = setInterval(() => {
      if (dur > 1) {
        dur = dur - 1;
        setTimeRemaining(dur);
      } else {
        clearInterval(timer);
        setTimeRemaining(0);
        setIsTiming(false);
        setTimerFinished(true);
      }
    }, 1000);

    setTimer(timer);
  }, []);

  const startTimer = useCallback((length: number) => {
    if (!isTiming) {
      setTimeRemaining(length);
      setIsTiming(true);
      setTimerFinished(false);
      initializeTimer(length);
    }
  }, [initializeTimer, isTiming]);

  const stopTimer = useCallback(() => {
    setIsTiming(false);
    setTimerFinished(false);
    clearInterval(timer!);
  }, [timer]);

  const presetTime = useCallback((time: number) => {
    setTimeRemaining(time);
  }, []);

  return {startTimer, stopTimer, isTiming, timeRemaining, presetTime, timerFinished};
};
