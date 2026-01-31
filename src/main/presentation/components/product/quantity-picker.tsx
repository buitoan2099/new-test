import React, { FC } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";

export const QuantityPicker: FC<{
  value: number;
  onChange: (quantity: number) => void;
  addToCart: () => void;
}> = ({ value, onChange, addToCart }) => {
  if (value < 1) {
    return (
      <div
        onClick={addToCart}
        className="w-full py-3 rounded-full text-[18px] text-[#FFFFFF] font-medium text-center"
        style={{
          backgroundColor: "#9CD5B4",
        }}
      >
        Thêm vào giỏ hàng
      </div>
    );
  }
  return (
    <Box flex className="border border-[#9CD5B4] rounded-full p-[6px]">
      <Button
        onClick={() => onChange(value - 1)}
        variant="secondary"
        type="neutral"
        icon={
          <div className="py-3 px-1">
            <div className="w-full h-[2px] bg-black" />
          </div>
        }
      />
      <Box flex justifyContent="center" alignItems="center" className="flex-1">
        <Text size="large" className="font-medium">
          Số lượng: {value}
        </Text>
      </Box>
      <Button
        onClick={() => onChange(value + 1)}
        variant="secondary"
        type="neutral"
        icon={<Icon icon="zi-plus" />}
      />
    </Box>
  );
};

export const SmallQuantityPicker: FC<{
  value: number;
  onChange: (quantity: number) => void;
  addToCart: () => void;
}> = ({ value, onChange, addToCart }) => {
  if (value < 1) {
    return (
      <Box
        flex
        className="border border-[#9CD5B4] rounded-full p-[6px] absolute bottom-2 right-2 flex items-center justify-center
    rounded-full bg-black/60"
      >
        <button
          onClick={addToCart}
          className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white"
        >
          <Icon
            icon="zi-plus"
            size={20}
            className="h-[5px] w-[5px] flex items-center justify-center"
          />
        </button>
      </Box>
    );
  }
  return (
    <Box
      flex
      className="border border-[#9CD5B4] rounded-full p-[6px] absolute bottom-2 right-2 flex items-center justify-center
    rounded-full bg-black/60"
    >
      <button
        onClick={() => onChange(value - 1)}
        className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white"
      >
        {/* <Icon
          icon="zi-plus"
          size={20}
          className="h-[5px] w-[5px] flex items-center justify-center"
        /> */}
        <div className="py-3 px-1">
          <div className="w-[10px] h-[1px] bg-black" />
        </div>
      </button>
      <Box
        flex
        justifyContent="center"
        alignItems="center"
        className="flex-1"
        mr={2}
        ml={2}
      >
        <Text className="font-medium text-white text-[15px]">{value}</Text>
      </Box>
      <button
        onClick={() => onChange(value + 1)}
        className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-white"
      >
        <Icon
          icon="zi-plus"
          size={20}
          className="h-[5px] w-[5px] flex items-center justify-center"
        />
      </button>
    </Box>
  );
};
