import { configureStore, ThunkDispatch, Action } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export default store;
