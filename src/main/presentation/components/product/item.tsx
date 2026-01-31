import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { FinalPrice } from "./final-price";
import { ProductPicker } from "./picker";
import { CartItem } from "../../../core/entities/Cart";
import { SmallQuantityPicker } from "./quantity-picker";
import {
  addProductToCart,
  changeProductQty,
} from "../../../presentation/redux/viewmodels/slices/HomeSlice";
import { useAppDispatch } from "../../../presentation/redux/store/hooks";

export const ProductItem: FC<{ cartItem: CartItem }> = ({
  cartItem: cartItem,
}) => {
  let product = cartItem.product;
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addProductToCart(product));
  };

  const changeQty = (value: number) => {
    dispatch(
      changeProductQty({
        product,
        quantity: value,
      }),
    );
  };

  return (
    <div>
      <ProductPicker
        product={product}
        selected={{ quantity: cartItem.quantity }}
      >
        {({ open }) => (
          <div className="space-y-2">
            <Box className="w-full aspect-square relative">
              <img
                onClick={open}
                loading="lazy"
                src={product.image}
                className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
              />
              <SmallQuantityPicker
                value={cartItem?.quantity ?? 0}
                onChange={changeQty}
                addToCart={addToCart}
              />
            </Box>
            <div onClick={open}>
              <Text>{product.name}</Text>
              <Text size="xxSmall" className="text-gray pb-2">
                <FinalPrice>{product}</FinalPrice>
              </Text>
            </div>
          </div>
        )}
      </ProductPicker>
    </div>
  );
};
