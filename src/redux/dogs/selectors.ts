import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

const selectState = (state: RootState) => state.dogs;

const selectLikedDogs = createSelector([selectState], state => state.liked);

const selectDogById = createSelector(
  [selectState, (state, dogId) => dogId],
  (state, dogId) => state.liked[dogId],
);

const selectDogLoading = createSelector([selectState], state => ({
  loading: state.loading,
  loaded: state.loaded,
}));

export { selectLikedDogs, selectDogById, selectDogLoading };
