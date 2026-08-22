import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import di from "../../../../di";
import { handleUseCaseError } from "../../../../core/usecases/HandleUseCaseException";

//login
export const handleLogInEvent = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const response = await di.authorizePhoneNameAndFollowOaUseCase.execute();
      console.log(response);
      const location = await di.getLocationUseCase.execute();
      console.log(location);
      return {
        user: response,
        location: location,
      };
    } catch (error) {
      return rejectWithValue(handleUseCaseError(error));
    }
  },
);
