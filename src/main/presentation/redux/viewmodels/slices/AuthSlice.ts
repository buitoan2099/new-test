import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../../../core/entities/User";
import { handleLogInEvent } from "../events/LogInOutEvents";
import { LocationData } from "../../../../core/entities/Zalo";
import { followOaEvent } from "../events/UpdateZaloInfoEvents";

let initUser = {};

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserInfo;
  message: string | null;
  location: LocationData;
}

const initialState: AuthState = {
  user: initUser as UserInfo,
  isLoading: false,
  isLoggedIn: false,
  message: null,
  location: {} as LocationData,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder
      .addCase(handleLogInEvent.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.isLoggedIn = false;
      })
      .addCase(handleLogInEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload["user"];
        state.location = action.payload["location"];
        state.isLoggedIn = true;
        console.log("Login successful:", action.payload);
        console.log("Login successful:", state.isLoggedIn);
      })
      .addCase(handleLogInEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload as string;
        state.isLoggedIn = false;
      });
    //login
    builder
      .addCase(followOaEvent.pending, (state) => {
        state.message = null;
        state.isLoading = true;
      })
      .addCase(followOaEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload["message"];
      })
      .addCase(followOaEvent.rejected, (state, action) => {
        state.isLoading = false;
        // state.message = action.payload as string;
        state.message = "Follow OA failed";
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
