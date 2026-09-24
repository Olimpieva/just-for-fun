import { Fragment } from "react";
import PixelButton from "components/PixelButton/PixelButton";
import star from "assets/pixel-record-star.png";
import css from "./Leaderboard.module.scss";

export interface IRecord {
  id: string;
  rank: number;
  name: string;
  durationMs: number;
  isMe?: boolean;
}

interface IProps {
  records: IRecord[];
  onRestart: () => void;
}

const formatTime = (durationMs: number) => {
  const seconds = Math.floor(durationMs / 1000);
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
};

export const Leaderboard = ({ records, onRestart }: IProps) => {
  const personalRecord = records.find(record => record.isMe);

  return (
    <section className={css.panel} aria-labelledby="leaderboard-title">
      <header className={css.header}>
        <h2 id="leaderboard-title">Рейтинг</h2>
      </header>
      <div className={css.content}>
        <div className={css.summary}>
          <img className={css.star} src={star} alt="" />
          <h3 className={css.label}>Личный рекорд!</h3>
          {personalRecord ? (
            <>
              <p className={css.time}>
                {formatTime(personalRecord.durationMs)}
              </p>
              <p className={css.rank}>{personalRecord.rank}-е место</p>
            </>
          ) : (
            <p className={css.empty}>Твой рекорд ещё впереди</p>
          )}
          <PixelButton className={css.restart} onClick={onRestart}>
            Ещё раз
          </PixelButton>
        </div>
        <div
          className={css.tableScroll}
          tabIndex={0}
          role="region"
          aria-label="Таблица результатов"
        >
          <table className={css.table}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Игрок</th>
                <th scope="col">Время</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => {
                const previous = records[index - 1];
                return (
                  <Fragment key={record.id}>
                    {previous && record.rank > previous.rank + 1 && (
                      <tr className={css.gap}>
                        <td colSpan={3} aria-label="Пропущенные места">
                          …
                        </td>
                      </tr>
                    )}
                    <tr
                      className={record.isMe ? css.current : undefined}
                      aria-current={record.isMe ? "true" : undefined}
                    >
                      <td>{record.rank}</td>
                      <th scope="row" title={record.name}>
                        {record.name}
                      </th>
                      <td>{formatTime(record.durationMs)}</td>
                    </tr>
                  </Fragment>
                );
              })}
              {!records.length && (
                <tr>
                  <td colSpan={3}>Пока нет результатов</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
