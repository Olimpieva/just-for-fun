import { useFavoritesStore } from "./favorites.store";

export const useLikedCuties = () => useFavoritesStore(state => state.liked);
export const useLikeCutie = () => useFavoritesStore(state => state.likeCutie);
export const useDislikeCutie = () =>
  useFavoritesStore(state => state.dislikeCutie);
export const useSyncFavoritesFromStorage = () =>
  useFavoritesStore(state => state.syncFromStorage);
