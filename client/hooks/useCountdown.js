import { useState, useEffect } from 'react';
export default function useCountdown(seconds) {
  const [secs, decrement] = useState(seconds);
  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setTimeout(() => {
        decrement(secs - 1);
      }, 1000);
      return () => clearTimeout(progressLevel);
    }
  }, [secs, seconds]);

  return secs;
}
