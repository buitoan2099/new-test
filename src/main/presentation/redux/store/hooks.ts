import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect, useRef, useState } from "react";
import { matchStatusBarColor } from "../../../presentation/utils/device";
import { createSelector } from "@reduxjs/toolkit";
import { calcFinalPrice } from "../../../presentation/utils/product";
import { useSnackbar } from "zmp-ui";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectCart = (state: RootState) => state.home?.cart;

export const selectTotalPrice = createSelector([selectCart], (cart) => {
  return cart?.reduce(
    (total, item) => total + item.quantity * calcFinalPrice(item.product),
    0,
  );
});

export const selectTotalQuantity = createSelector([selectCart], (cart) => {
  return cart?.reduce((total, item) => total + item.quantity, 0);
});

export function useMatchStatusTextColor(visible?: boolean) {
  const changedRef = useRef(false);
  useEffect(() => {
    if (changedRef.current) {
      matchStatusBarColor(visible ?? false);
    } else {
      changedRef.current = true;
    }
  }, [visible]);
}

const originalScreenHeight = window.innerHeight;

export function useVirtualKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const detectKeyboardOpen = () => {
      setVisible(window.innerHeight + 160 < originalScreenHeight);
    };
    window.addEventListener("resize", detectKeyboardOpen);
    return () => {
      window.removeEventListener("resize", detectKeyboardOpen);
    };
  }, []);

  return visible;
}

export function useToBeImplemented() {
  const snackbar = useSnackbar();
  return () =>
    snackbar.openSnackbar({
      type: "success",
      text: "Chức năng dành cho các bên tích hợp phát triển...",
    });
}
