import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../viewmodels/slices/AuthSlice";
import HomeSlice from "../viewmodels/slices/HomeSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  home: HomeSlice,
});

export default rootReducer;
