import { useEffect } from "react";

import { useRecordStore } from "./record.store";

export const useRecordSync = () => {
  const syncFromStorage = useRecordStore(state => state.syncFromStorage);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        (event.key === "minesweeperRecord" || event.key === null)
      ) {
        syncFromStorage(event.newValue);
      }
    };

    syncFromStorage();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [syncFromStorage]);
};
