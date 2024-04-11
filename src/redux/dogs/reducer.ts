import { createReducer } from "@reduxjs/toolkit";
import { InitialState } from "./types";
import { fetchDog, likeDog } from "./actions";

const initialState: InitialState = {
  current: null,
  liked: {},
  loading: false,
  loaded: false,
};

const dogsReducer = createReducer(initialState, builder => {
  builder
    .addCase(fetchDog.pending, state => {
      state.loading = true;
    })
    .addCase(fetchDog.rejected, state => {
      state.loading = false;
      state.loaded = false;
    })
    .addCase(fetchDog.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.current = action.payload;
    })
    .addCase(likeDog, (state, action) => {
      state.liked[action.payload.id] = action.payload;
    });
});

export default dogsReducer;
