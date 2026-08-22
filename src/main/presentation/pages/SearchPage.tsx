import React, { FC } from "react";
import { Header, Page } from "zmp-ui";
import { Inquiry } from "../components/searchPage/inquiry";
import { SearchResult } from "../components/searchPage/result";

const SearchPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Tìm kiếm" />
      <Inquiry />
      <SearchResult />
    </Page>
  );
};

export default SearchPage;
