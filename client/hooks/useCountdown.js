import { useState, useEffect } from 'react';
export default function useCountdown(seconds) {
  const [secs, decrement] = useState(seconds);
  const [progress, increment] = useState(100);
  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setInterval(() => {
        increment(progress - 100 / seconds);
        decrement(secs - 1);
      }, 1000);
      return () => clearInterval(progressLevel);
    }
  }, [progress, secs, seconds]);

  return [progress, secs];
}
