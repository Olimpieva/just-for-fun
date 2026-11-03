export type RecordState = {
  bestMs: number | null;
  saveResult: (durationMs: number) => boolean;
  syncFromStorage: (value?: string | null) => void;
};
