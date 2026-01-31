/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import { App as AntdApp, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { App, SnackbarProvider } from "zmp-ui";
import { validateMessages } from "./presentation/constants/validate-messages";
import { AppProvider } from "./presentation/context/AppContext";
import { getBasePath } from "./presentation/utils/zma";
import ErrorZmpPage from "./presentation/pages/ErrorPage";
import LoginPage from "./presentation/pages/LoginPage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./presentation/redux/store/store";
import HomePage from "./presentation/pages/HomePage";
import { Layout } from "./presentation/components/layout";
import { EmptyLayout } from "./presentation/components/empty-layout";
import ErrorPage from "./presentation/pages/ErrorPage";
import ProfilePage from "./presentation/pages/ProfilePage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <EmptyLayout />,
      children: [
        {
          index: true,
          // path: "/login",
          element: <LoginPage />,
        },
      ],
    },
    {
      // path: "/",
      // element: <Layout />,
      path: "/main",
      element: <Layout />, // CÓ bottom bar
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
      ],
    },
    { path: "*", element: <ErrorPage /> },
  ],
  { basename: getBasePath() },
);

const MyApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
          <App>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#4884FF",
                  fontFamily:
                    "'Inter',-apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                },
              }}
              form={{ validateMessages }}
              locale={viVN}
            >
              <AntdApp>
                <SnackbarProvider>
                  <AppProvider>
                    <RouterProvider router={router} />
                  </AppProvider>
                </SnackbarProvider>
              </AntdApp>
            </ConfigProvider>
          </App>
        </RecoilRoot>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
