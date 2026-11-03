import { useReducer } from "react";

import { useNow } from "shared/hooks";

import type { GameAction, GameConfig } from "../Minesweeper.types";
import { createGame, gameReducer, getElapsedMs, getFlagsLeft } from "../Minesweeper.utils";

export const useMinesweeper = (config: GameConfig, onWin?: (durationMs: number) => void) => {
  const [game, dispatch] = useReducer(gameReducer, config, createGame);
  const now = useNow(game.status === "playing");

  const play = (action: GameAction) => {
    const next = gameReducer(game, action);
    if (game.status !== "won" && next.status === "won") {
      onWin?.(getElapsedMs(next, Date.now()));
    }
    dispatch(action);
  };

  const reveal = (index: number) => play({ type: "reveal", index, time: Date.now() });

  const toggleFlag = (index: number) => play({ type: "toggleFlag", index, time: Date.now() });

  const restart = () => dispatch({ type: "restart", game: createGame(config) });

  return {
    cells: game.cells,
    status: game.status,
    explodedIndex: game.explodedIndex,
    flagsLeft: getFlagsLeft(game),
    elapsedMs: getElapsedMs(game, now),
    reveal,
    toggleFlag,
    restart,
  };
};
