import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../../core/entities/Product";
import { getProductsEvents } from "../events/GetProductsEvents";
import { Cart } from "../../../../core/entities/Cart";
import { calcFinalPrice } from "../../../../presentation/utils/product";
import { UpdateCartEvents } from "../events/UpdateCartEvents";

export interface HomeState {
  cart: Cart;
  isLoading: boolean;
}

const initialState: HomeState = {
  cart: [],
  isLoading: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    addProductToCart: UpdateCartEvents().addToCart,
    changeProductQty: UpdateCartEvents().changeQuantity,
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(getProductsEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = (action.payload as Product[]).map((product) => ({
          product,
          quantity: 0,
        }));
      })
      .addCase(getProductsEvents.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { addProductToCart, changeProductQty } = homeSlice.actions;
export default homeSlice.reducer;
