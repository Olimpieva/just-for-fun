import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Card, Confetti, RainbowTitle } from "components";
import { ReactComponent as BombIcon } from "assets/bomb.svg";
import { Leaderboard, demoRecords } from "widgets/Leaderboard";
import { getWordEnding } from "utils/helpers";
import { useMinesweeper } from "./hooks";
import { formatDuration, isGameOver } from "./Minesweeper.utils";
import type { GameStatus } from "./Minesweeper.types";
import { GAME_CONFIG, AUTO_RESTART_DELAY_MS } from "./Minesweeper.config";
import Board from "./Board";

import css from "./Minesweeper.module.scss";

const getTitle = (status: GameStatus, flagsLeft: number) => {
  if (status === "won") return "WINNER!";
  if (status === "lost") return "LOSER!";

  return `Осталось ${flagsLeft} ${getWordEnding(flagsLeft, [
    "бомба",
    "бомбы",
    "бомб",
  ])}`;
};

const Minesweeper = () => {
  const {
    cells,
    status,
    explodedIndex,
    flagsLeft,
    elapsedMs,
    reveal,
    toggleFlag,
    restart,
  } = useMinesweeper(GAME_CONFIG);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const isLost = status === "lost";

  useEffect(() => {
    if (status !== "won") return undefined;

    const timer = setTimeout(restart, AUTO_RESTART_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status, restart]);

  if (showLeaderboard) {
    return (
      <Leaderboard
        records={demoRecords}
        onRestart={() => {
          setShowLeaderboard(false);
          restart();
        }}
      />
    );
  }

  return (
    <Card title="">
      <div
        className={cn(css.position, {
          [css.visible]: isLost,
          [css.boom]: isLost,
        })}
      >
        <BombIcon width={120} />
      </div>

      <div className={css.toolbar}>
        <time
          className={css.timer}
          dateTime={`PT${Math.floor(elapsedMs / 1000)}S`}
          aria-label="Время партии"
        >
          {formatDuration(elapsedMs)}
        </time>

        <button
          type="button"
          className={css.leaderboardButton}
          onClick={() => setShowLeaderboard(true)}
        >
          Рейтинг
        </button>
      </div>

      <div className={css.container}>
        <div className={css.grid}>
          <Board
            size={GAME_CONFIG.size}
            cells={cells}
            explodedIndex={explodedIndex}
            onReveal={reveal}
            onToggleFlag={toggleFlag}
          />

          {status === "won" && (
            <div className={css.wrapper}>
              <Confetti width={480} height={480} />
            </div>
          )}
        </div>

        <div className={css.top}>
          <button type="button" className={css.button} onClick={restart}>
            <RainbowTitle title="Начать заново" />
          </button>
        </div>

        <div
          className={cn(css.bottom, {
            [css.bottomAnimated]: isGameOver(status),
          })}
          aria-live="polite"
        >
          <RainbowTitle title={getTitle(status, flagsLeft)} />
        </div>
      </div>
    </Card>
  );
};

export default Minesweeper;
