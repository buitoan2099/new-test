import React, { Suspense, useEffect, useRef } from "react";
import { Box, Input, Page } from "zmp-ui";
import { Welcome } from "../components/homePage/welcome";
import { Banner } from "../components/homePage/banner";
import { Divider } from "../components/divider";
import { Categories } from "../components/homePage/categories";
import { ProductList } from "../components/homePage/product-list";
import { useVirtualKeyboardVisible } from "../redux/store/hooks";
import { CartPreview } from "../components/homePage/cart-preview";
import { useNavigate } from "react-router-dom";
import { ProductItemSkeleton } from "../components/skeletons";

const HomePage: React.FunctionComponent = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();

  return (
    <Page className="relative flex flex-col bg-white h-screen">
      <Welcome />
      <Box p={4} className="bg-white">
        <Input.Search
          // onFocus={() => navigate("/search")}
          onFocus={() => {
            navigate("/search");
          }}
          placeholder="Tìm nhanh đồ uống, món mới ..."
        />
      </Box>
      <Box className="flex-1 overflow-auto">
        <Banner />
        {/* <Suspense>
          <Categories />
        </Suspense> */}
        {/* <Recommend /> */}
        {/* <ProductItemSkeleton /> */}

        <Divider />
        <ProductList />
        <Divider />
      </Box>
      {!keyboardVisible && <CartPreview />}
    </Page>
  );
};

export default HomePage;
