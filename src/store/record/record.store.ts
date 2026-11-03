import { create } from "zustand";

import type { RecordState } from "./record.types";

const STORAGE_KEY = "minesweeperRecord";

const parseBest = (value: string | null): number | null => {
  const bestMs = Number(value);
  return Number.isFinite(bestMs) && bestMs > 0 ? bestMs : null;
};

const readBest = (): number | null => {
  try {
    return parseBest(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

const saveBest = (bestMs: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(bestMs));
  } catch {
    // nothing to do
  }
};

export const useRecordStore = create<RecordState>()((set, get) => ({
  bestMs: readBest(),
  saveResult: durationMs => {
    get().syncFromStorage();
    const { bestMs } = get();
    if (bestMs !== null && durationMs >= bestMs) return false;

    saveBest(durationMs);
    set({ bestMs: durationMs });
    return true;
  },
  syncFromStorage: value => {
    const storedBestMs = readBest();
    const currentBestMs = get().bestMs;
    const results = [currentBestMs, storedBestMs, parseBest(value ?? null)].filter(
      result => result !== null,
    );
    const bestMs = results.length ? Math.min(...results) : null;

    if (bestMs !== null && bestMs !== storedBestMs) saveBest(bestMs);
    if (bestMs !== currentBestMs) set({ bestMs });
  },
}));
