import { useState, useCallback, useMemo, useEffect } from "react";

const MINE = -1;

export type Cell = {
  value: number;
  isABomb: boolean;
  isVisible: boolean;
  isCoveredByFlag: boolean;
};

export type Minesweeper = {
  field: Cell;
  createNewField: () => void;
  getCellState: (x: number, y: number) => Cell;
  makeCellVisible: (x: number, y: number) => void;
  toggleFlag: (x: number, y: number) => void;
  detectedBombsCounter: number;
  isLoosing: boolean;
  isWinning: boolean;
  isGameOver: boolean;
};

const initialCell = {
  value: 0,
  isABomb: false,
  isVisible: false,
  isCoveredByFlag: false,
};

export const useMinesweeper = (size: number) => {
  const isCorrectPoint = useCallback(
    (x: number, y: number) => x >= 0 && x < size && y >= 0 && y < size,
    [size],
  );

  const createField = useCallback((): Cell[] => {
    const field: Cell[] = new Array(size * size)
      .fill(0)
      .map(() => ({ ...initialCell }));

    const determineCellValue = (x: number, y: number) => {
      if (isCorrectPoint(x, y)) {
        if (field[y * size + x].value === MINE) return;

        field[y * size + x].value += 1;
      }
    };

    let bobmbsCounter = 0;

    while (bobmbsCounter < size) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);

      if (field[y * size + x].isABomb) {
        // eslint-disable-next-line no-continue
        continue;
      }

      field[y * size + x].value = MINE;
      field[y * size + x].isABomb = true;

      bobmbsCounter += 1;

      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ].forEach(increment => {
        const nextIndexX = x + increment[0];
        const nextIndexY = y + increment[1];

        determineCellValue(nextIndexX, nextIndexY);
      });
    }

    return field;
  }, [isCorrectPoint, size]);

  const [field, setField] = useState<Cell[]>(() => createField());
  const [detectedBombsCounter, setDetectedBombsCounter] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [status, setStatus] = useState<undefined | boolean>(undefined);

  const createNewField = useCallback(() => {
    setField(() => createField());
    setIsGameOver(false);
    setStatus(undefined);
    setDetectedBombsCounter(0);
  }, [createField]);

  const bombs = useMemo(
    () =>
      field.reduce((acc: number[], item, index) => {
        if (item.isABomb) {
          return [...acc, index];
        }

        return acc;
      }, []),
    [field],
  );

  const getCellState = useCallback(
    (x: number, y: number) => field[y * size + x],
    [field, size],
  );

  const toggleFlag = useCallback(
    (x: number, y: number) => {
      const { isCoveredByFlag, isVisible } = getCellState(x, y);

      if (isVisible) {
        return;
      }

      setField(prevState => {
        const newField = [...prevState];

        if (isCoveredByFlag) {
          if (detectedBombsCounter === 0) {
            return prevState;
          }

          newField[y * size + x].isCoveredByFlag = false;
          setDetectedBombsCounter(prevValue => prevValue - 1);
        } else {
          if (detectedBombsCounter >= size) {
            return prevState;
          }

          newField[y * size + x].isCoveredByFlag = true;
          setDetectedBombsCounter(prevValue => prevValue + 1);
        }

        return newField;
      });
    },
    [getCellState, detectedBombsCounter, size],
  );

  const makeCellVisible = useCallback(
    (x: number, y: number) => {
      let visibleCells: [number, number][] = [];
      const checkedCells: string[] = [];
      const cellsToCheck: [number, number][] = [];

      const isChecked = (x: number, y: number) =>
        checkedCells.includes(`x:${x};y:${y}`);

      const addToChecked = (x: number, y: number) =>
        checkedCells.push(`x:${x};y:${y}`);

      const addNeighboursToCheck = (x: number, y: number) => {
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ].forEach(increment => {
          const nextIndexX = x + increment[0];
          const nextIndexY = y + increment[1];
          if (
            isCorrectPoint(nextIndexX, nextIndexY) &&
            !isChecked(nextIndexX, nextIndexY)
          ) {
            cellsToCheck.push([nextIndexX, nextIndexY]);
          }
        });
      };

      const checkCell = (x: number, y: number) => {
        addToChecked(x, y);
        const { isVisible, value, isCoveredByFlag } = getCellState(x, y);

        // ! Need to change this behavior

        if (!isVisible && !isCoveredByFlag) {
          visibleCells = [...visibleCells, [x, y]];

          if (value === 0) {
            addNeighboursToCheck(x, y);
          }
        }
      };

      checkCell(x, y);

      while (cellsToCheck.length) {
        const [x, y] = cellsToCheck.pop()!!;
        checkCell(x, y);
      }

      setField(prevState => {
        const newField = [...prevState];

        visibleCells.forEach(([x, y]) => {
          if (getCellState(x, y).isCoveredByFlag) {
            setDetectedBombsCounter(prevValue => prevValue - 1);
          }

          newField[y * size + x].isVisible = true;
        });

        return newField;
      });
    },
    [getCellState, size, setDetectedBombsCounter, isCorrectPoint],
  );

  // ! I don't know what I was doing here, but it looks like shit.

  const isGameLost = useMemo(() => {
    if (isGameOver) {
      return false;
    }

    const activatedBomb = bombs.find(index => field[index].isVisible);
    return !isGameOver && activatedBomb !== undefined;
  }, [bombs, field, isGameOver]);

  const isGameWon = useMemo(() => {
    if (isGameOver) {
      return false;
    }

    const nonDeactivatedBomb = bombs.find(
      index => !field[index].isCoveredByFlag,
    );
    return nonDeactivatedBomb === undefined;
  }, [bombs, field, isGameOver]);

  const isLoosing = useMemo(() => status !== undefined && !status, [status]);
  const isWinning = useMemo(() => status !== undefined && status, [status]);

  useEffect(() => {
    if (isGameLost && status === undefined) {
      setStatus(false);
      setIsGameOver(true);
    }

    if (isGameWon && status === undefined) {
      setStatus(true);
      setIsGameOver(true);
    }
  }, [isGameLost, isGameWon, size, status]);

  useEffect(() => {
    if (isGameOver) {
      setField(prevState =>
        prevState.map(cell => ({
          ...cell,
          isVisible: true,
          isCoveredByFlag: false,
        })),
      );
    }
  }, [isGameOver]);

  return {
    field,
    createNewField,
    getCellState,
    makeCellVisible,
    toggleFlag,
    detectedBombsCounter,
    isLoosing,
    isWinning,
    isGameOver,
  };
};
