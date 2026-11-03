import { useState } from "react";

import { useBestTime, useSaveResult } from "store/record";

import { demoRecords, type IRecord } from "../components";

export const useLeaderboard = () => {
  const bestMs = useBestTime();
  const saveResult = useSaveResult();
  const [isOpen, setIsOpen] = useState(false);

  const players =
    bestMs === null
      ? [...demoRecords]
      : [...demoRecords, { id: "you", name: "you", durationMs: bestMs, isMe: true }];

  const records: IRecord[] = players
    .sort((a, b) => a.durationMs - b.durationMs)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  const submitResult = (durationMs: number) => {
    if (saveResult(durationMs)) setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { records, isOpen, close, submitResult };
};
