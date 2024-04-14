import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { Button, Card, RainbowTitle } from "components";
import ReactConfetti from "react-confetti";
import Confetti from "components/Confetti/Confetti";
import { getWordEnding } from "utils/helpers";
import { ReactComponent as ThumbsUpIcon } from "assets/thumbs-up.svg";
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
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [animated, setAnimated] = useState(false);

  const startNewGame = useCallback(() => {
    createNewField();
    setIsConfettiVisible(false);
    setAnimated(false);
  }, [createNewField]);

  useEffect(() => {
    if (isWinning || isLoosing) setAnimated(true);
  }, [isLoosing, isWinning]);

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

    return `Осталось: ${remainingBomsCounter} ${getWordEnding(
      remainingBomsCounter,
      ["бомба", "бомбы", "бомб"],
    )}`;
  }, [isLoosing, isWinning, remainingBomsCounter]);

  console.log({ isLoosing });

  return (
    <Card title="Сапёр">
      <div className={css.container}>
        <div className={css.grid} style={{ position: "relative" }}>
          <Grid
            size={size}
            getCellState={getCellState}
            makeCellVisible={makeCellVisible}
            toggleFlag={toggleFlag}
          />

          {isConfettiVisible && (
            <div className={css.notification}>
              <Confetti />
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
            [css.bottomAnimated]: animated,
          })}
        >
          <RainbowTitle title={title} />
        </div>
      </div>
    </Card>
  );
}

export default Minesweeper;
