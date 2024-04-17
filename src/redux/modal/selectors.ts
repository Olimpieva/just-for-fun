import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

const selectState = (state: RootState) => state.modal;

const selectCurrentModal = createSelector(
  [selectState],
  state => state.current,
);

export { selectState, selectCurrentModal };
