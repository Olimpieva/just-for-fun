import React, { useMemo } from "react";
import { Button, Card, RainbowTitle } from "components";

import { ReactComponent as PauseIcon } from "assets/pause.svg";
import { useMinesweeper } from "./useMinesweeper";
import Grid from "./Grid";

import css from "./Minesweeper.module.scss";

const size = 10;

function Minesweeper() {
  const {
    getCellState,
    makeCellVisible,
    toggleFlag,
    createNewField,
    detectedBombsCounter,
    isWinning,
    isLoosing,
    isGameOver,
  } = useMinesweeper(size);
  const remainingBomsCounter = useMemo(
    () => 10 - detectedBombsCounter,
    [detectedBombsCounter],
  );

  return (
    <Card title="Сапёр">
      <div className={css.container}>
        <div className={css.grid}>
          <Grid
            size={size}
            getCellState={getCellState}
            makeCellVisible={makeCellVisible}
            toggleFlag={toggleFlag}
          />
        </div>

        <div className={css.info}>
          <span>{`Бомбы: ${remainingBomsCounter}`}</span>
          <Button title="Начать заново" onClick={createNewField} />
        </div>

        <RainbowTitle
          title="Сделай паузу"
          icon={<PauseIcon color="#f3a14b" />}
        />
      </div>
    </Card>
  );
}

export default Minesweeper;
