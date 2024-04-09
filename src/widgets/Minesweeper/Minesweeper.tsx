import React, { useMemo, useState } from "react";
import { useMinesweeper } from "utils/hooks";
import { Button, Card } from "components";

import css from "./Minesweeper.module.scss";
import Cell from "./Cell";

function Minesweeper() {
  const size = 10;

  const dimension = new Array(size).fill(null);

  const {
    getCellState,
    makeCellVisible,
    toggleFlag,
    detectedBombsCounter,
    isWinning,
    isLoosing,
  } = useMinesweeper(size);

  const [isStarted, setIsStared] = useState(false);

  const start = () => {
    setIsStared(true);
  };

  return (
    <Card title="Сапёр">
      {!isStarted && <Button title="Начать" onClick={start} />}
      {isStarted && (
        <div>
          <p>{`Бомбы: ${10 - detectedBombsCounter}`}</p>
          {isWinning && <p>WIN!!!</p>}
          {isLoosing && <p>LOOSE!</p>}
          {dimension.map((_, y) => (
            <div key={y} className={css.row}>
              {dimension.map((_, x) => (
                <div key={x} className={css.cell}>
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
      )}
    </Card>
  );
}

export default Minesweeper;
