import { combineReducers } from "@reduxjs/toolkit";
import dogsReducer from "./dogs/reducer";
import foxesReducer from "./foxes/reducer";

const reducer = combineReducers({
  dogs: dogsReducer,
  foxes: foxesReducer,
});

export default reducer;
