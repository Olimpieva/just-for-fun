import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

const selectState = (state: RootState) => state.foxes;

const selectLikedFoxes = createSelector([selectState], state => state.liked);

const selectFoxById = createSelector(
  [selectState, (state, dogId) => dogId],
  (state, dogId) => state.liked[dogId],
);

const selectFoxLoading = createSelector([selectState], state => ({
  loading: state.loading,
  loaded: state.loaded,
}));

export { selectLikedFoxes, selectFoxById, selectFoxLoading };
