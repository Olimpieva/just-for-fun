import { act, renderHook } from "@testing-library/react";
import { readFavorites, useFavoritesStore } from "./favorites.store";
import { useFavoritesSync } from "./useFavoritesSync";

const image = { id: "saved-id", image: "fox.jpg" };

beforeEach(() => {
  localStorage.clear();
  useFavoritesStore.setState({ liked: {} });
});

test("preserves existing favorites and their storage format", () => {
  localStorage.setItem("liked", JSON.stringify({ [image.id]: image }));
  useFavoritesStore.getState().syncFromStorage();
  expect(useFavoritesStore.getState().liked[image.id]).toEqual(image);
  const second = { id: "second", image: "dog.jpg" };
  useFavoritesStore.getState().likeCutie(second);
  expect(JSON.parse(localStorage.getItem("liked")!)).toEqual({
    [image.id]: image,
    second,
  });
  useFavoritesStore.getState().dislikeCutie(image.id);
  expect(readFavorites()).toEqual({ second });
});

test("handles corrupt or malformed saved data", () => {
  ["broken", "null", "[]", '{"bad":null}', '{"bad":{"id":"bad"}}'].forEach(
    value => {
      localStorage.setItem("liked", value);
      expect(readFavorites()).toEqual({});
    },
  );
});

test("syncs changes and storage clearing from another tab", () => {
  const { unmount } = renderHook(() => useFavoritesSync());
  localStorage.setItem("liked", JSON.stringify({ [image.id]: image }));
  act(() =>
    window.dispatchEvent(
      new StorageEvent("storage", { key: "liked", storageArea: localStorage }),
    ),
  );
  expect(useFavoritesStore.getState().liked).toEqual({ [image.id]: image });
  localStorage.clear();
  act(() =>
    window.dispatchEvent(
      new StorageEvent("storage", { key: null, storageArea: localStorage }),
    ),
  );
  expect(useFavoritesStore.getState().liked).toEqual({});
  unmount();
});
