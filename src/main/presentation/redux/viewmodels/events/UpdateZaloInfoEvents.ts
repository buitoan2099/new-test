import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import di from "../../../../di";
import { handleUseCaseError } from "../../../../core/usecases/HandleUseCaseException";

//follow OA
export const followOaEvent = createAsyncThunk(
  "profile/followOa",
  async (_, { rejectWithValue }) => {
    try {
      await di.FollowOaUseCase.execute();
      return {
        success: true,
        message: "Followed OA successfully",
      };
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: handleUseCaseError(error),
      });
    }
  },
);
