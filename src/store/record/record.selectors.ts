import { useRecordStore } from "./record.store";

export const useBestTime = () => useRecordStore(state => state.bestMs);
export const useSaveResult = () => useRecordStore(state => state.saveResult);
