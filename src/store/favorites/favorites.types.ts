import type { Cutie } from "entities/cutie";

export type Favorites = Record<string, Cutie>;

export type FavoritesState = {
  liked: Favorites;
  likeCutie: (cutie: Cutie) => void;
  dislikeCutie: (id: string) => void;
  syncFromStorage: () => void;
};
