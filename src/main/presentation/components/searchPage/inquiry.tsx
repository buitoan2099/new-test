import React, { useCallback } from "react";
import { FC } from "react";
import { Box, Input } from "zmp-ui";
import { debounce } from "lodash";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../presentation/redux/store/hooks";
import { searchProducts } from "../../../presentation/redux/viewmodels/slices/SearchSlice";

export const Inquiry: FC = () => {
  const keyword = useAppSelector((state) => state.search?.keyword || "");
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    debounce((keyword: string) => {
      dispatch(searchProducts(keyword));
    }, 200),
    [],
  );

  return (
    <Box
      p={4}
      pt={6}
      className="bg-white transition-all ease-out flex-none"
      ref={
        ((el: HTMLDivElement) => {
          setTimeout(() => {
            if (el) {
              el.style.paddingTop = "8px";
            }
          });
        }) as any
      }
    >
      <Input.Search
        ref={(el) => {
          if (!el?.input?.value) {
            el?.focus();
          }
        }}
        defaultValue={keyword}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Tìm nhanh đồ uống, món mới ..."
        clearable
        // allowClear
      />
    </Box>
  );
};
