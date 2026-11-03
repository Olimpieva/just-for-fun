import cn from "classnames";

import BombIcon from "assets/game/bomb.svg?react";
import { Card, Confetti, RainbowTitle } from "shared/ui";

import { Board, Leaderboard } from "./components";
import { useAutoRestart, useLeaderboard, useMinesweeper } from "./hooks";
import { GAME_CONFIG } from "./Minesweeper.config";
import { formatDuration, getStatusTitle, isGameOver } from "./Minesweeper.utils";

import css from "./Minesweeper.module.scss";

export const Minesweeper = () => {
  const leaderboard = useLeaderboard();

  const { cells, status, explodedIndex, flagsLeft, elapsedMs, reveal, toggleFlag, restart } =
    useMinesweeper(GAME_CONFIG, leaderboard.submitResult);

  useAutoRestart(status, restart);

  const isLost = status === "lost";

  if (leaderboard.isOpen) {
    return (
      <Leaderboard
        records={leaderboard.records}
        onRestart={() => {
          leaderboard.close();
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
          <RainbowTitle title={getStatusTitle(status, flagsLeft)} />
        </div>
      </div>
    </Card>
  );
};
