import React, { FC, useMemo } from "react";
import { DisplayPrice } from "./price";
import { Product } from "../../../core/entities/Product";
import { calcFinalPrice } from "../../../presentation/utils/product";

export const FinalPrice: FC<{
  children: Product;
}> = ({ children }) => {
  const finalPrice = useMemo(() => calcFinalPrice(children), [children]);
  return <DisplayPrice>{finalPrice}</DisplayPrice>;
};
