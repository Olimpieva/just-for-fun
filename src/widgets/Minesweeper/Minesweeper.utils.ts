import type {
  Cell,
  Game,
  GameAction,
  GameConfig,
  GameStatus,
} from "./Minesweeper.types";

const NEIGHBOUR_OFFSETS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
] as const;

export const getNeighbours = (index: number, size: number): number[] => {
  const x = index % size;
  const y = Math.floor(index / size);

  return NEIGHBOUR_OFFSETS.map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => nx >= 0 && nx < size && ny >= 0 && ny < size)
    .map(([nx, ny]) => ny * size + nx);
};

const shuffle = <T>(items: readonly T[], random: () => number): T[] => {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const createGame = (
  config: GameConfig,
  random: () => number = Math.random,
): Game => {
  const { size, mines } = config;
  const total = size * size;

  if (mines <= 0 || mines >= total) {
    throw new RangeError(`Mines count must be between 1 and ${total - 1}`);
  }

  return {
    config,
    cells: Array.from({ length: total }, () => ({
      isMine: false,
      adjacentMines: 0,
      status: "hidden",
    })),
    status: "ready",
    mineOrder: shuffle(
      Array.from({ length: total }, (_, index) => index),
      random,
    ),
    explodedIndex: null,
    startedAt: null,
    finishedAt: null,
  };
};

const placeMines = (game: Game, safeIndex: number): Cell[] => {
  const { size, mines } = game.config;
  const safeZone = new Set([safeIndex, ...getNeighbours(safeIndex, size)]);
  const excluded =
    game.cells.length - safeZone.size >= mines
      ? safeZone
      : new Set([safeIndex]);

  const mineIndices = new Set(
    game.mineOrder.filter(index => !excluded.has(index)).slice(0, mines),
  );

  return game.cells.map((cell, index) => ({
    ...cell,
    isMine: mineIndices.has(index),
    adjacentMines: getNeighbours(index, size).filter(n => mineIndices.has(n))
      .length,
  }));
};

const revealAll = (cells: readonly Cell[]): Cell[] =>
  cells.map(cell => ({ ...cell, status: "revealed" }));

const floodReveal = (
  cells: readonly Cell[],
  start: number,
  size: number,
): Cell[] => {
  const result = [...cells];
  const stack = [start];
  const visited = new Set(stack);

  while (stack.length > 0) {
    const index = stack.pop() as number;
    const cell = result[index];

    if (cell.status === "hidden") {
      result[index] = { ...cell, status: "revealed" };

      if (cell.adjacentMines === 0) {
        getNeighbours(index, size)
          .filter(neighbour => !visited.has(neighbour))
          .forEach(neighbour => {
            visited.add(neighbour);
            stack.push(neighbour);
          });
      }
    }
  }

  return result;
};

export const countFlags = (cells: readonly Cell[]): number =>
  cells.filter(cell => cell.status === "flagged").length;

export const getFlagsLeft = (game: Game): number =>
  game.config.mines - countFlags(game.cells);

export const isGameOver = (status: GameStatus): boolean =>
  status === "won" || status === "lost";

const isWon = (cells: readonly Cell[]): boolean => {
  const allSafeRevealed = cells.every(
    cell => cell.isMine || cell.status === "revealed",
  );
  const allMinesFlagged = cells.every(
    cell => cell.isMine === (cell.status === "flagged"),
  );

  return allSafeRevealed || allMinesFlagged;
};

export const getElapsedMs = (game: Game, now: number): number => {
  if (game.startedAt === null) return 0;

  return Math.max(0, (game.finishedAt ?? now) - game.startedAt);
};

export const formatDuration = (durationMs: number): string => {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const finishIfWon = (game: Game, time: number): Game =>
  game.status === "playing" && isWon(game.cells)
    ? {
        ...game,
        cells: revealAll(game.cells),
        status: "won",
        finishedAt: time,
      }
    : game;

export const reveal = (game: Game, index: number, time: number): Game => {
  if (isGameOver(game.status) || game.cells[index].status !== "hidden") {
    return game;
  }

  const isFirstMove = game.status === "ready";
  const cells = isFirstMove ? placeMines(game, index) : game.cells;
  const startedAt = isFirstMove ? time : game.startedAt;

  if (cells[index].isMine) {
    return {
      ...game,
      cells: revealAll(cells),
      status: "lost",
      explodedIndex: index,
      startedAt,
      finishedAt: time,
    };
  }

  return finishIfWon(
    {
      ...game,
      cells: floodReveal(cells, index, game.config.size),
      status: "playing",
      startedAt,
    },
    time,
  );
};

export const toggleFlag = (game: Game, index: number, time: number): Game => {
  const cell = game.cells[index];

  if (isGameOver(game.status) || cell.status === "revealed") {
    return game;
  }

  if (cell.status === "hidden" && getFlagsLeft(game) === 0) {
    return game;
  }

  const cells = [...game.cells];
  cells[index] = {
    ...cell,
    status: cell.status === "flagged" ? "hidden" : "flagged",
  };

  return finishIfWon({ ...game, cells }, time);
};

export const gameReducer = (game: Game, action: GameAction): Game => {
  switch (action.type) {
    case "reveal":
      return reveal(game, action.index, action.time);
    case "toggleFlag":
      return toggleFlag(game, action.index, action.time);
    case "restart":
      return action.game;
    default:
      return game;
  }
};
