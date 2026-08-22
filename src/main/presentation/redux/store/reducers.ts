import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../viewmodels/slices/AuthSlice";
import HomeSlice from "../viewmodels/slices/HomeSlice";
import NotificationSlice from "../viewmodels/slices/NotificationSlice";
import SearchSlice from "../viewmodels/slices/SearchSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  home: HomeSlice,
  notification: NotificationSlice,
  search: SearchSlice,
});

export default rootReducer;
