import { CSSProperties } from "react";
import type { Cell as CellState } from "../Minesweeper.types";
import Cell from "../Cell";

import css from "./Board.module.scss";

type Props = {
  size: number;
  cells: readonly CellState[];
  explodedIndex: number | null;
  onReveal: (index: number) => void;
  onToggleFlag: (index: number) => void;
};

const Board = ({
  size,
  cells,
  explodedIndex,
  onReveal,
  onToggleFlag,
}: Props) => (
  <div
    className={css.board}
    style={{ "--size": size } as CSSProperties}
    aria-label="Игровое поле. Enter открывает клетку, F ставит флажок"
  >
    {cells.map((cell, index) => (
      <Cell
        key={index}
        index={index}
        cell={cell}
        isExploded={index === explodedIndex}
        onReveal={onReveal}
        onToggleFlag={onToggleFlag}
      />
    ))}
  </div>
);

export default Board;
