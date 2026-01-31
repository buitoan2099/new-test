import React, { Suspense } from "react";
import { Box, Input, Page } from "zmp-ui";
import { Welcome } from "../components/homePage/welcome";
import { Banner } from "../components/homePage/banner";
import { Divider } from "../components/divider";
import { Categories } from "../components/homePage/categories";
import { ProductList } from "../components/homePage/product-list";
import { useVirtualKeyboardVisible } from "../redux/store/hooks";
import { CartPreview } from "../components/homePage/cart-preview";

const HomePage: React.FunctionComponent = () => {
  const keyboardVisible = useVirtualKeyboardVisible();

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Box p={4} className="bg-white">
          <Input.Search
            // onFocus={() => navigate("/search")}
            onFocus={() => {}}
            placeholder="Tìm nhanh đồ uống, món mới ..."
          />
        </Box>
        <Banner />
        {/* <Suspense>
          <Categories />
        </Suspense> */}
        {/* <Recommend /> */}
        <Divider />
        <ProductList />
        <Divider />
        {!keyboardVisible && <CartPreview />}
      </Box>
    </Page>
  );
};

export default HomePage;
