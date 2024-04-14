import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

const selectState = (state: RootState) => state.gallery;

const selectCurrentImage = createSelector(
  [selectState],
  state => state.current,
);

const selectLikedImages = createSelector([selectState], state => state.liked);

const selectLikedImageById = createSelector(
  [selectState, (state, imageId) => imageId],
  (state, imageId) => state.liked[imageId],
);

const selectImageLoading = createSelector([selectState], state => ({
  loading: state.loading,
  loaded: state.loaded,
}));

export {
  selectCurrentImage,
  selectLikedImages,
  selectLikedImageById,
  selectImageLoading,
};
