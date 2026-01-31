import React, { FC, useMemo } from "react";
import { DisplayPrice } from "./price";
import { Product, Option } from "../../../core/entities/Product";

export const DisplayPriceChange: FC<{ children: Product; option: Option }> = ({
  children,
  option,
}) => {
  const changes = useMemo(
    () =>
      option.priceChange
        ? option.priceChange.type === "fixed"
          ? option.priceChange.amount
          : children.price * option.priceChange.percent
        : 0,
    [children, option],
  );
  return (
    <>
      {changes > 0 && "+"}
      <DisplayPrice>{changes}</DisplayPrice>
    </>
  );
};
