import axios from "axios";
import axiosRetry from "axios-retry";
import { nativeStorage, getUserID } from "zmp-sdk";
import { getParamUtm } from "../../presentation/context/AppContext";
import { createAuthDataSource } from "../datasource/local/AuthDataSource";

const AI_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const TOKEN_ERROR = import.meta.env.VITE_ZALO_APP_TOKEN_ERROR;
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const ApiClient = axios.create({
  baseURL: String(AI_DOMAIN),
});

// 👉 Hàng đợi để giữ các request trong lúc refresh token
const subscribeTokenRefresh = (cb: () => void) => {
  refreshSubscribers.push(cb);
};

// 👉 Khi token mới có, tiếp tục các request bị pending
export const onRefreshed = () => {
  refreshSubscribers.forEach((cb) => cb()); // callback tự lấy token từ storage
  refreshSubscribers = [];
};

let i = 0;
// 🎯 **Interceptor trước request**: Gắn token, user ID, UTM
ApiClient.interceptors.request.use(
  async (config) => {
    const authDataSource = createAuthDataSource();
    const { accessToken: accessTokenZlo } =
      await authDataSource.getTokenZaloCustom();

    config.headers["zuToken"] = accessTokenZlo;

    const resUserID = (await getUserID()) || import.meta.env.VITE_ZALO_APP_UID;
    const accessToken = nativeStorage.getItem("accessToken");

    const paramsUtm = getParamUtm();
    if (paramsUtm?.utm_source && paramsUtm?.utm_source !== "undefined") {
      config.headers["utm_source"] = paramsUtm?.utm_source;
    }

    if (paramsUtm?.utm_medium && paramsUtm?.utm_medium !== "undefined") {
      config.headers["utm_medium"] = paramsUtm?.utm_medium;
    }

    if (paramsUtm?.utm_campaign && paramsUtm?.utm_campaign !== "undefined") {
      config.headers["utm_campaign"] = paramsUtm?.utm_campaign;
    }

    if (
      paramsUtm?.pango_source_c &&
      paramsUtm?.pango_source_c !== "undefined"
    ) {
      config.headers["pango_source_c"] = paramsUtm?.pango_source_c;
    }

    if (
      paramsUtm?.pango_campaign_c &&
      paramsUtm?.pango_campaign_c !== "undefined"
    ) {
      config.headers["pango_campaign_c"] = paramsUtm?.pango_campaign_c;
    }

    if (
      paramsUtm?.pango_medium_c &&
      paramsUtm?.pango_medium_c !== "undefined"
    ) {
      config.headers["pango_medium_c"] = paramsUtm?.pango_medium_c;
    }

    config.headers["lang_id"] = 1;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    config.headers["zuId"] = resUserID;
    // config.headers["zuId"] = "3992776571222578342";

    return config;
  },
  (error) => Promise.reject(error),
);

// 🎯 **Interceptor sau response**: Xử lý lỗi 401
ApiClient.interceptors.response.use(
  (response) => {
    const resData = response.data;

    if (resData?.success === false) {
      // Nếu lỗi code = -100, dùng cơ chế refresh queue
      if (
        resData?.error?.code === -100 &&
        resData?.error?.message?.toLowerCase().includes("token")
      ) {
        console.log("retry");
        const originalRequest = response.config as any;

        if (!originalRequest._retry100) {
          originalRequest._retry100 = true;

          if (isRefreshing) {
            return new Promise((resolve) => {
              subscribeTokenRefresh(() => {
                resolve(ApiClient(originalRequest));
              });
            });
          }

          isRefreshing = true;
          return new Promise(async (resolve, reject) => {
            try {
              const authDataSource = createAuthDataSource();
              const { refreshToken: zaloRefreshToken } =
                (await authDataSource.getTokenZaloCustom()) ||
                import.meta.env.VITE_ZALO_APP_TOKEN;

              await authDataSource.refreshTokenZalo(zaloRefreshToken);

              onRefreshed();
              resolve(ApiClient(originalRequest));
            } catch (err) {
              reject(err);
            } finally {
              isRefreshing = false;
            }
          });
        }
      }
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response &&
      error?.response?.status === 401 &&
      !originalRequest._retry
      //  &&
      // error?.response?.data?.message !== "Invalid Zalo token"
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(ApiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const paramsUtm = getParamUtm();
        // const userRepository = createUserRepository(); // Cần import hoặc định nghĩa
        // const refresh = refreshTokenUseCase(userRepository); // Cần import hoặc định nghĩa
        const authDataSource = createAuthDataSource();
        if (error?.response?.data?.message === "Invalid Zalo token") {
          const { refreshToken: zaloRefreshToken } =
            (await authDataSource.getTokenZaloCustom()) ||
            import.meta.env.VITE_ZALO_APP_TOKEN;

          await authDataSource.refreshTokenZalo(zaloRefreshToken);
        } else {
          //refresh api nếu token bên backend hết hạn
          //   await refresh(
          //     paramsUtm?.phone,
          //     paramsUtm?.name,
          //     paramsUtm?.session_id
          //   );
          //   try {
          //     await userRepository.refreshToken();
          //   } catch (err) {
          //     if (!phone || !name || !session_id) return;
          //     return;
          //   }
        }

        onRefreshed();
        return ApiClient(originalRequest);
      } catch (err) {
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// 🎯 **Giữ nguyên logic retry của bạn**
axiosRetry(ApiClient, {
  // retries: 20, // Vẫn retry tối đa 20 lần
  // retryDelay: () => 800, // Giữ nguyên delay 800ms
  // retryCondition: (error) => {
  //   return (
  //     error.response?.status === 401 &&
  //     error?.request?.responseURL !==
  //       `${AI_DOMAIN}/api/v1/custom-app/zalo/saleman/auth/refresh-token`
  //   );
  // },
});

export default ApiClient;
