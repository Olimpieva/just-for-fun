import { create } from "zustand";
import type { FavoritesState, Favorites } from "./favorites.types";

export const readFavorites = (): Favorites => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem("liked") || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(
        ([id, item]) =>
          item && item.id === id && typeof item.image === "string",
      ),
    );
  } catch {
    return {};
  }
};

const saveFavorites = (liked: Favorites) => {
  try {
    localStorage.setItem("liked", JSON.stringify(liked));
  } catch {
    // nothing to do
  }
};

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  liked: readFavorites(),
  likeCutie: cutie => {
    const liked = { ...get().liked, [cutie.id]: cutie };
    saveFavorites(liked);
    set({ liked });
  },
  dislikeCutie: id => {
    const liked = { ...get().liked };
    delete liked[id];
    saveFavorites(liked);
    set({ liked });
  },
  syncFromStorage: () => set({ liked: readFavorites() }),
}));
