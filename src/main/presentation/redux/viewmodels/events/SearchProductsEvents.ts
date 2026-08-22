import { PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../slices/SearchSlice";

export const SearchProductsEvents = () => {
  const search = (state: SearchState, action: PayloadAction<string>) => {
    state.keyword = action.payload;
    if (!state.keyword.trim()) {
      state.products = state.initProducts;
    }
    const products = state.initProducts;

    state.products = products.filter((product) =>
      product.name
        .trim()
        .toLowerCase()
        .includes(state.keyword.trim().toLowerCase()),
    );
  };

  return {
    search,
  };
};
