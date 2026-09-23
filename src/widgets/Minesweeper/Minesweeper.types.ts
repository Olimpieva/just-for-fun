export type CellStatus = "hidden" | "revealed" | "flagged";

export type Cell = {
  isMine: boolean;
  adjacentMines: number;
  status: CellStatus;
};

export type GameStatus = "ready" | "playing" | "won" | "lost";

export type GameConfig = {
  size: number;
  mines: number;
};

export type Game = {
  config: GameConfig;
  cells: readonly Cell[];
  status: GameStatus;
  mineOrder: readonly number[];
  explodedIndex: number | null;
  startedAt: number | null;
  finishedAt: number | null;
};

export type GameAction =
  | { type: "reveal"; index: number; time: number }
  | { type: "toggleFlag"; index: number; time: number }
  | { type: "restart"; game: Game };
