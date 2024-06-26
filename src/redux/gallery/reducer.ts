import { createReducer } from "@reduxjs/toolkit";
import { InitialState } from "./types";
import {
  fetchDogImage,
  fetchFoxImage,
  likeImage,
  dislikeImage,
  clearCurrentImage,
  updateLikedImages,
} from "./actions";

const initialState: InitialState = {
  current: null,
  liked: {},
  loading: false,
  loaded: false,
};

const galleryReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchDogImage.pending, state => {
      state.loading = true;
    })
    .addCase(fetchDogImage.rejected, state => {
      state.loading = false;
      state.loaded = false;
    })
    .addCase(fetchDogImage.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.current = action.payload;
    })
    .addCase(fetchFoxImage.pending, state => {
      state.loading = true;
    })
    .addCase(fetchFoxImage.rejected, state => {
      state.loading = false;
      state.loaded = false;
    })
    .addCase(fetchFoxImage.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.current = action.payload;
    })
    .addCase(likeImage, (state, action) => {
      state.liked[action.payload.id] = action.payload;
    })
    .addCase(dislikeImage, (state, action) => {
      const newLiked = state.liked;
      delete newLiked[action.payload];
      state.liked = newLiked;
    })
    .addCase(clearCurrentImage, state => {
      state.current = null;
    })
    .addCase(updateLikedImages, (state, action) => {
      state.liked = action.payload;
    });
});

export default galleryReducer;
