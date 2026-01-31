import React from "react";
import { Outlet } from "react-router-dom";

export const EmptyLayout = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};
