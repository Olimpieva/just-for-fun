import React from 'react';
import { FireTwoTone, FlagTwoTone } from '@ant-design/icons';

import css from './Cell.module.scss';

type Props = {
  state: CellPropsType;
  makeVisible: () => void;
  toggleFlag: () => void;
};

type CellPropsType = {
  value: number;
  isVisible: boolean;
  isABomb: boolean;
  isCoveredByFlag: boolean;
};

function Cell({ state, makeVisible, toggleFlag }: Props) {
  const { isVisible, isABomb, value, isCoveredByFlag } = state;

  const onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFlag();
  };

  if (isCoveredByFlag) {
    return (
      <div className={css.cell} onClick={() => makeVisible()} onContextMenu={onContextMenu}>
        <FlagTwoTone twoToneColor="#52c41a" />
      </div>
    );
  }

  if (!isVisible) {
    return <div className={css.cell} onClick={() => makeVisible()} onContextMenu={onContextMenu} />;
  }

  return (
    <div className={css.cell} onContextMenu={onContextMenu}>
      {isABomb ? <FireTwoTone twoToneColor="#eb2f96" /> : <span>{value}</span>}
    </div>
  );
}

export default Cell;
