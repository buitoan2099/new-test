import { Product } from "../../../core/entities/Product";
import React, { FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../../../presentation/redux/store/hooks";
import { Box, Text } from "zmp-ui";
import {
  addProductToCart,
  changeProductQty,
} from "../../../presentation/redux/viewmodels/slices/HomeSlice";
import { Sheet } from "../fullscreen-sheet";
import { FinalPrice } from "./final-price";
import { QuantityPicker } from "./quantity-picker";

export interface ProductPickerProps {
  product?: Product;
  selected?: {
    quantity: number;
  };
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
  isViewOnly?: boolean;
}

export const ProductPicker: FC<ProductPickerProps> = ({
  children,
  product,
  selected,
  isViewOnly,
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const addToCart = () => {
    if (product) {
      dispatch(addProductToCart(product));
    }
    // setVisible(false);
  };

  const changeQty = (value: number) => {
    if (product) {
      dispatch(
        changeProductQty({
          product,
          quantity: value,
        }),
      );
    }
    if (value === 0) {
      setVisible(false);
    }
  };
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet
          visible={visible}
          onClose={() => setVisible(false)}
          autoHeight
          className="custom-sheet1"
        >
          {product && (
            <Box className="space-y-6 mt-2" p={4}>
              <Box className="space-y-2">
                <Box className="w-full aspect-square relative">
                  <img
                    loading="lazy"
                    src={product.image}
                    className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
                  />
                </Box>
                <Text.Title>{product.name}</Text.Title>
                <Text>
                  <FinalPrice>{product}</FinalPrice>
                </Text>
                <Text>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description ?? "",
                    }}
                  ></div>
                </Text>
              </Box>
              {!isViewOnly && (
                <Box className="space-y-5">
                  <QuantityPicker
                    value={selected?.quantity ?? 0}
                    onChange={changeQty}
                    addToCart={addToCart}
                  />
                </Box>
              )}
            </Box>
          )}
        </Sheet>,
        document.body,
      )}
    </>
  );
};
