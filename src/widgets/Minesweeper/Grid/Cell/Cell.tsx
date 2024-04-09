import React from "react";
import { FireTwoTone, FlagTwoTone } from "@ant-design/icons";
import { Cell as CellType } from "widgets/Minesweeper/useMinesweeper";
import { ReactComponent as FireIcon } from "assets/fire.svg";

import css from "./Cell.module.scss";

type Props = {
  state: CellType;
  makeVisible: () => void;
  toggleFlag: () => void;
};

function Cell({ state, makeVisible, toggleFlag }: Props) {
  const { isVisible, isABomb, value, isCoveredByFlag } = state;

  const onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFlag();
  };

  if (isCoveredByFlag)
    return (
      <div
        className={css.cell}
        onClick={() => makeVisible()}
        onContextMenu={onContextMenu}
      >
        <FlagTwoTone twoToneColor="#52c41a" />
      </div>
    );

  if (!isVisible)
    return (
      <div
        className={css.cell}
        onClick={() => makeVisible()}
        onContextMenu={onContextMenu}
      />
    );

  return (
    <div className={css.cell} onContextMenu={onContextMenu}>
      {isABomb ? <FireIcon width={20} height={20} /> : <span>{value}</span>}
    </div>
  );
}

export default Cell;
