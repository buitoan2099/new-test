import {
  useAppSelector,
  selectTotalPrice,
  selectTotalQuantity,
} from "../../../presentation/redux/store/hooks";
import React, { FC } from "react";
import { Box, Button, Text } from "zmp-ui";
import { DisplayPrice } from "../product/price";

export const CartPreview: FC = () => {
  const quantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <Box
      flex
      className="sticky top-0 bottom-0 bg-background p-4 space-x-4 border-t border-gray-200"
    >
      <Box
        flex
        flexDirection="column"
        justifyContent="space-between"
        className="min-w-[120px] flex-none"
      >
        <Text className="text-gray" size="xSmall">
          {quantity} sản phẩm
        </Text>
        <Text.Title size="large">
          <DisplayPrice>{totalPrice ?? 0}</DisplayPrice>
        </Text.Title>
      </Box>
      <Button
        type="highlight"
        disabled={!quantity}
        fullWidth
        style={{
          background: !quantity
            ? "#E5E7EB" // xám (disabled)
            : "linear-gradient(90deg, #22c55e 0%, #4ade80 100%)", // xanh (selected)
          color: !quantity ? "#9CA3AF" : "#fff",
          borderRadius: "999px",
          height: 44,
          transition: "all 0.25s ease",
        }}
        onClick={() => {}}
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
