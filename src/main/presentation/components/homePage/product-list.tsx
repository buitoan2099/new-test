import React, { FC, Suspense, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box, Spinner } from "zmp-ui";
import { ProductItemSkeleton } from "../skeletons";
import { ProductItem } from "../product/item";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../presentation/redux/store/hooks";
import { Section } from "../section";
import { getProductsEvents } from "../../../presentation/redux/viewmodels/events/GetProductsEvents";

export const ProductListContent: FC = () => {
  const products = useAppSelector((state) => state.home?.cart || []);
  const loading = useAppSelector((state) => state.home?.isLoading || false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsEvents());
  }, []);

  if (loading)
    return (
      <div>
        <ProductListFallback />
      </div>
    );

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductItem key={product.product.id} cartItem={product} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
