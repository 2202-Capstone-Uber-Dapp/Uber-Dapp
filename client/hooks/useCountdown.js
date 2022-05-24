import { useState, useEffect } from 'react';
export default function useCountdown() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (seconds > 0) {
      const progressLevel = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(progressLevel);
    }
  }, [seconds]);
  function startTimer() {
    setSeconds(500);
  }
  return [seconds, startTimer];
}
