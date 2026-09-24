import { KeyboardEvent, MouseEvent, memo } from "react";
import cn from "classnames";
import FireIcon from "assets/fire.svg?react";
import FlagIcon from "assets/flag.svg?react";
import type { Cell as CellState } from "../Minesweeper.types";

import css from "./Cell.module.scss";

type Props = {
  index: number;
  cell: CellState;
  isExploded: boolean;
  onReveal: (index: number) => void;
  onToggleFlag: (index: number) => void;
};

const getLabel = ({ status, isMine, adjacentMines }: CellState) => {
  if (status === "flagged") return "Флажок";
  if (status === "hidden") return "Закрытая клетка";
  if (isMine) return "Бомба";
  return `Бомб рядом: ${adjacentMines}`;
};

const Cell = ({ index, cell, isExploded, onReveal, onToggleFlag }: Props) => {
  const { status, isMine, adjacentMines } = cell;

  const handleContextMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onToggleFlag(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key.toLowerCase() === "f") {
      onToggleFlag(index);
    }
  };

  const renderContent = () => {
    if (status === "flagged") return <FlagIcon width={20} height={20} />;
    if (status === "hidden") return null;
    if (isMine) return <FireIcon width={20} height={20} />;
    return adjacentMines;
  };

  return (
    <button
      type="button"
      className={cn(css.cell, {
        [css.hidden]: status === "hidden",
        [css.exploded]: isExploded,
      })}
      aria-label={getLabel(cell)}
      onClick={() => onReveal(index)}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      {renderContent()}
    </button>
  );
};

export default memo(Cell);
