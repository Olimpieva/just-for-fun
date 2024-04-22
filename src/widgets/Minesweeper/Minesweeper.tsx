import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { Card, RainbowTitle } from "components";
import Confetti from "components/Confetti/Confetti";
import { ReactComponent as BombIcon } from "assets/bomb.svg";
import { getWordEnding } from "utils/helpers";
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
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startNewGame = useCallback(() => {
    createNewField();
    setIsConfettiVisible(false);
  }, [createNewField]);

  useEffect(() => {
    if (isWinning) {
      setIsConfettiVisible(true);
      timerRef.current = setTimeout(() => {
        startNewGame();
      }, 60000);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isWinning, startNewGame]);

  const title = useMemo(() => {
    if (isWinning) {
      return "WINNER!";
    }

    if (isLoosing) {
      return "LOOSER!";
    }

    return `Осталось ${remainingBomsCounter} ${getWordEnding(
      remainingBomsCounter,
      ["бомба", "бомбы", "бомб"],
    )}`;
  }, [isLoosing, isWinning, remainingBomsCounter]);

  return (
    <Card title="">
      <div
        className={cn(css.position, {
          [css.visible]: isLoosing,
          [css.boom]: isLoosing,
        })}
      >
        <BombIcon width={120} />
      </div>

      <div className={css.container}>
        <div className={css.grid}>
          <Grid
            size={size}
            getCellState={getCellState}
            makeCellVisible={makeCellVisible}
            toggleFlag={toggleFlag}
          />

          {isConfettiVisible && (
            <div className={css.wrapper}>
              <Confetti width={480} height={480} />
            </div>
          )}
        </div>

        <div className={css.top}>
          <button className={css.button} onClick={startNewGame}>
            <RainbowTitle title="Начать заново" />
          </button>
        </div>

        <div
          className={cn(css.bottom, {
            [css.bottomAnimated]: isGameOver,
          })}
        >
          <RainbowTitle title={title} />
        </div>
      </div>
    </Card>
  );
}

export default Minesweeper;
