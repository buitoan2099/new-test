import { ScrollRestoration } from "../../../components/scroll-restoration";
import React from "react";
import { Outlet } from "react-router-dom";

export const EmptyLayout = () => {
  return (
    <div className="h-screen">
      <ScrollRestoration />

      <Outlet />
    </div>
  );
};
