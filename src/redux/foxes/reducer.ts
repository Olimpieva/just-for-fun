import { createReducer } from "@reduxjs/toolkit";
import { InitialState } from "./types";
import { fetchFox, likeFox } from "./actions";

const initialState: InitialState = {
  current: null,
  liked: {},
  loading: false,
  loaded: false,
};

const foxesReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchFox.pending, state => {
      state.loading = true;
    })
    .addCase(fetchFox.rejected, state => {
      state.loading = false;
      state.loaded = false;
    })
    .addCase(fetchFox.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.current = action.payload;
    })
    .addCase(likeFox, (state, action) => {
      state.liked[action.payload.id] = action.payload;
    });
});

export default foxesReducer;
