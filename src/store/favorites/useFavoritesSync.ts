import { useEffect } from "react";
import { useSyncFavoritesFromStorage } from "./favorites.selectors";

export const useFavoritesSync = () => {
  const syncFromStorage = useSyncFavoritesFromStorage();

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        (event.key === "liked" || event.key === null)
      ) {
        syncFromStorage();
      }
    };
    syncFromStorage();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [syncFromStorage]);
};
