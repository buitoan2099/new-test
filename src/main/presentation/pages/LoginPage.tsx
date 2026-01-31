import React, { FC, useContext, useEffect } from "react";
import { Page } from "zmp-ui";

import { useNavigate } from "react-router-dom";
import BackgroundSection from "../components/LoginPage/BackgroundSection";
import LoginFootSection from "../components/LoginPage/LoginFootSection";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { handleLogInEvent } from "../redux/viewmodels/events/LogInOutEvents";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  // Sử dụng optional chaining và giá trị mặc định false để tránh lỗi undefined
  const isLoading = useAppSelector((state) => state.auth?.isLoading || false);
  const isLoggedIn = useAppSelector((state) => state.auth?.isLoggedIn || false);
  const dispatch = useAppDispatch();

  const handleLoginClick = async () => {
    // navigate("/register", {
    //   replace: true,
    // });
    dispatch(handleLogInEvent());

    return;
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/main/home");
      return;
    }
  }, [isLoggedIn, navigate]);

  return (
    <Page className="relative flex flex-1 flex-col hide-scrollbar">
      <div className="h-full w-full">
        <BackgroundSection />
        <LoginFootSection onClick={handleLoginClick} isLoading={isLoading} />
      </div>
    </Page>
  );
};

export default LoginPage;
