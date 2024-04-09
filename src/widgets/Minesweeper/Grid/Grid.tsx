import React from "react";
import { Minesweeper } from "../useMinesweeper";
import Cell from "./Cell";

import css from "./Grid.module.scss";

type Props = Pick<
  Minesweeper,
  "getCellState" | "makeCellVisible" | "toggleFlag"
> & { size: number };

const Grid = ({ size, getCellState, makeCellVisible, toggleFlag }: Props) => {
  const dimension = new Array(size).fill(null);

  console.log("render");

  return (
    <div>
      {dimension.map((_, y) => (
        <div key={y} className={css.row}>
          {dimension.map((_, x) => (
            <div key={x}>
              <Cell
                state={getCellState(x, y)}
                makeVisible={() => makeCellVisible(x, y)}
                toggleFlag={() => toggleFlag(x, y)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
