import { useEffect } from "react";

import { AUTO_RESTART_DELAY_MS } from "../Minesweeper.config";
import type { GameStatus } from "../Minesweeper.types";

export const useAutoRestart = (status: GameStatus, restart: () => void) => {
  useEffect(() => {
    if (status !== "won") return undefined;

    const timer = setTimeout(restart, AUTO_RESTART_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status, restart]);
};
