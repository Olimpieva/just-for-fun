import { combineReducers } from "@reduxjs/toolkit";
import galleryReducer from "./gallery/reducer";
import modalReducer from "./modal/reducer";

const reducer = combineReducers({
  gallery: galleryReducer,
  modal: modalReducer,
});

export default reducer;
