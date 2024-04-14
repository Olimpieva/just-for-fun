import { combineReducers } from "@reduxjs/toolkit";
import galleryReducer from "./gallery/reducer";

const reducer = combineReducers({
  gallery: galleryReducer,
});

export default reducer;
