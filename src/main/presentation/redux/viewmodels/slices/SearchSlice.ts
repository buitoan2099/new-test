import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../../core/entities/Product";
import { getProductsEvents } from "../events/GetProductsEvents";
import { SearchProductsEvents } from "../events/SearchProductsEvents";

export interface SearchState {
  products: Product[];
  initProducts: Product[];
  keyword: string;
  isLoading: boolean;
}

const initialState: SearchState = {
  products: [],
  initProducts: [],
  keyword: "",
  isLoading: false,
};

const searchSlice = createSlice({
  name: "seacrch",
  initialState: initialState,
  reducers: {
    searchProducts: SearchProductsEvents().search,
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(getProductsEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload as Product[];
        state.initProducts = action.payload as Product[];
      })
      .addCase(getProductsEvents.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { searchProducts } = searchSlice.actions;
export default searchSlice.reducer;
