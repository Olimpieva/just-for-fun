import {
  createGame,
  formatDuration,
  gameReducer,
  getElapsedMs,
  getFlagsLeft,
  getNeighbours,
  reveal,
  toggleFlag,
} from "./Minesweeper.utils";
import type { Game } from "./Minesweeper.types";

const createTestGame = (size: number, mineIndices: number[]): Game => {
  const game = createGame({ size, mines: mineIndices.length });
  const rest = game.mineOrder.filter(index => !mineIndices.includes(index));

  return { ...game, mineOrder: [...mineIndices, ...rest] };
};

const range = (from: number, to: number) =>
  Array.from({ length: to - from }, (_, i) => from + i);

const open = (game: Game, index: number, time = 0) => reveal(game, index, time);

const flag = (game: Game, index: number, time = 0) =>
  toggleFlag(game, index, time);

describe("getNeighbours", () => {
  it("returns 3 neighbours for a corner and 8 for an inner cell", () => {
    expect(getNeighbours(0, 3).sort()).toEqual([1, 3, 4]);
    expect(getNeighbours(4, 3)).toHaveLength(8);
  });
});

describe("createGame", () => {
  it("rejects an impossible mines count", () => {
    expect(() => createGame({ size: 3, mines: 9 })).toThrow(RangeError);
    expect(() => createGame({ size: 3, mines: 0 })).toThrow(RangeError);
  });

  it("starts with hidden cells and no mines", () => {
    const game = createGame({ size: 4, mines: 3 });

    expect(game.status).toBe("ready");
    expect(game.cells.every(cell => cell.status === "hidden")).toBe(true);
    expect(game.cells.some(cell => cell.isMine)).toBe(false);
  });
});

describe("reveal", () => {
  it("never puts a mine under the first click or its neighbours", () => {
    range(0, 50).forEach(attempt => {
      const size = 9;
      const index = attempt % (size * size);
      const game = open(createGame({ size, mines: 10 }), index);

      expect(game.cells.filter(cell => cell.isMine)).toHaveLength(10);
      [index, ...getNeighbours(index, size)].forEach(safe => {
        expect(game.cells[safe].isMine).toBe(false);
      });
      expect(game.status).not.toBe("lost");
    });
  });

  it("flood-fills empty cells and stops at numbers", () => {
    const game = open(createTestGame(5, range(10, 15)), 24);

    range(15, 25).forEach(index => {
      expect(game.cells[index].status).toBe("revealed");
    });
    range(0, 15).forEach(index => {
      expect(game.cells[index].status).toBe("hidden");
    });
    expect(game.cells[17].adjacentMines).toBe(3);
    expect(game.status).toBe("playing");
  });

  it("loses and reveals the whole field when a mine is opened", () => {
    const started = open(createTestGame(5, range(10, 15)), 24);
    const lost = open(started, 12);

    expect(lost.status).toBe("lost");
    expect(lost.explodedIndex).toBe(12);
    expect(lost.cells.every(cell => cell.status === "revealed")).toBe(true);
  });

  it("wins when every safe cell is revealed", () => {
    const game = open(createTestGame(5, [0, 1]), 24);

    expect(game.status).toBe("won");
  });

  it("does not mutate the previous state", () => {
    const initial = createTestGame(5, range(10, 15));
    const snapshot = JSON.parse(JSON.stringify(initial));

    open(initial, 24);

    expect(initial).toEqual(snapshot);
  });
});

describe("toggleFlag", () => {
  it("toggles a flag and protects the cell from being revealed", () => {
    const started = open(createTestGame(5, range(10, 15)), 24);
    const flagged = flag(started, 0);

    expect(flagged.cells[0].status).toBe("flagged");
    expect(getFlagsLeft(flagged)).toBe(4);
    expect(open(flagged, 0)).toBe(flagged);
    expect(flag(flagged, 0).cells[0].status).toBe("hidden");
  });

  it("does not allow more flags than mines", () => {
    const started = open(createTestGame(5, range(10, 15)), 24);
    const allFlagsUsed = range(0, 5).reduce(
      (game, index) => flag(game, index),
      started,
    );

    expect(getFlagsLeft(allFlagsUsed)).toBe(0);
    expect(flag(allFlagsUsed, 5)).toBe(allFlagsUsed);
  });

  it("ignores revealed cells", () => {
    const started = open(createTestGame(5, range(10, 15)), 24);

    expect(flag(started, 24)).toBe(started);
  });

  it("wins when every mine is flagged", () => {
    const mines = range(10, 15);
    const started = open(createTestGame(5, mines), 24);
    const won = mines.reduce((game, index) => flag(game, index), started);

    expect(won.status).toBe("won");
  });
});

describe("timer", () => {
  it("starts on the first reveal, not on flags", () => {
    const flagged = flag(createTestGame(5, range(10, 15)), 0, 500);
    const started = open(flagged, 24, 1_000);

    expect(flagged.startedAt).toBeNull();
    expect(getElapsedMs(flagged, 9_999)).toBe(0);
    expect(started.startedAt).toBe(1_000);
    expect(getElapsedMs(started, 4_500)).toBe(3_500);
  });

  it("stops when the game is lost", () => {
    const started = open(createTestGame(5, range(10, 15)), 24, 1_000);
    const lost = open(started, 12, 6_000);

    expect(lost.finishedAt).toBe(6_000);
    expect(getElapsedMs(lost, 60_000)).toBe(5_000);
  });

  it("stops when the game is won", () => {
    const mines = range(10, 15);
    const started = open(createTestGame(5, mines), 24, 1_000);
    const won = mines.reduce(
      (game, index, i) => flag(game, index, 2_000 + i * 1_000),
      started,
    );

    expect(won.finishedAt).toBe(6_000);
    expect(getElapsedMs(won, 60_000)).toBe(5_000);
  });

  it("formats duration as mm:ss", () => {
    expect(formatDuration(0)).toBe("00:00");
    expect(formatDuration(65_900)).toBe("01:05");
    expect(formatDuration(600_000)).toBe("10:00");
  });
});

describe("gameReducer", () => {
  it("replaces the state on restart", () => {
    const next = createGame({ size: 4, mines: 2 });
    const state = gameReducer(createGame({ size: 4, mines: 2 }), {
      type: "restart",
      game: next,
    });

    expect(state).toBe(next);
  });
});
