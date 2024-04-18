import { createReducer } from "@reduxjs/toolkit";
import { InitialState } from "./types";
import { showModal, hideModal } from "./actions";

const initialState: InitialState = {
  current: null,
};

const modalReducer = createReducer(initialState, builder => {
  builder
    .addCase(showModal, (state, action) => {
      state.current = action.payload;
    })
    .addCase(hideModal, state => {
      state.current = null;
    });
});

export default modalReducer;
