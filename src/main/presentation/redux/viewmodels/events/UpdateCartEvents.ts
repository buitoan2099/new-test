import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { handleUseCaseError } from "../../../../core/usecases/HandleUseCaseException";
import { Product } from "../../../../core/entities/Product";
import { HomeState } from "../slices/HomeSlice";
import { Cart, CartItem } from "../../../../core/entities/Cart";

export const UpdateCartEvents = () => {
  const addToCart = (state: HomeState, action: PayloadAction<Product>) => {
    const item = state.cart.find((i) => i.product.id === action.payload.id);
    if (item) item.quantity = 1;
  };

  const changeQuantity = (
    state: HomeState,
    action: PayloadAction<CartItem>,
  ) => {
    const item = state.cart.find(
      (i) => i.product.id === action.payload.product.id,
    );
    if (item) item.quantity = action.payload.quantity;
  };

  return {
    addToCart,
    changeQuantity,
  };
};
