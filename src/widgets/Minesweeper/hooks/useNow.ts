import { useEffect, useState } from "react";

export const useNow = (isRunning: boolean, intervalMs = 1000) => {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    if (!isRunning) return undefined;

    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [isRunning, intervalMs]);

  return now;
};
