import type { ICutie } from "entities/cutie";

export type Favorites = Record<string, ICutie>;

export type FavoritesState = {
  liked: Favorites;
  likeCutie: (cutie: ICutie) => void;
  dislikeCutie: (id: string) => void;
  syncFromStorage: () => void;
};
