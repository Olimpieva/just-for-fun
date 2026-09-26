import { useReducer } from "react";
import {
  createGame,
  gameReducer,
  getElapsedMs,
  getFlagsLeft,
} from "../Minesweeper.utils";
import type { GameConfig } from "../Minesweeper.types";
import { useNow } from "./useNow";

export const useMinesweeper = (config: GameConfig) => {
  const [game, dispatch] = useReducer(gameReducer, config, createGame);
  const now = useNow(game.status === "playing");

  const reveal = (index: number) =>
    dispatch({ type: "reveal", index, time: Date.now() });

  const toggleFlag = (index: number) =>
    dispatch({ type: "toggleFlag", index, time: Date.now() });

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
