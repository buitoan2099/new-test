import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import di from "../../../../di";
import { handleUseCaseError } from "../../../../core/usecases/HandleUseCaseException";
import { Product } from "../../../../core/entities/Product";

//login
export const getProductsEvents = createAsyncThunk(
  "home/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      //   const response = await di.AuthorizePhoneNameAndFollowOaUseCase.execute();
      console.log("loading products...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = (await import("../../../../../../mock/products.json"))
        .default;

      return response;
    } catch (error) {
      return rejectWithValue(handleUseCaseError(error));
    }
  },
);
