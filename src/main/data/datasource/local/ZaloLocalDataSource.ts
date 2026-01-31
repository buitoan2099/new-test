import {
  followOA,
  getLocation,
  getPhoneNumber,
  getSetting,
  getUserInfo,
  nativeStorage,
} from "zmp-sdk";
import axios from "axios";
import { createAuthDataSource } from "./AuthDataSource";
import { authorize } from "zmp-sdk/apis";
import {
  LocationModel,
  PhoneModel,
  ZaloInfoModel,
} from "../../../data/models/ZaloModel";

const MODE = import.meta.env.MODE;
const AI_TENANT_ID = import.meta.env.VITE_TENANT_ID;
const AI_UPLOAD = import.meta.env.VITE_API_UPLOAD;

export const createZaloLocalDataSource = () => ({
  requestFollowOA: async (): Promise<void> => {
    try {
      await followOA({
        id: (import.meta.env.VITE_ZALO_OA_ID || "").toString(),
      });

      nativeStorage.setItem("followOaV", "true");
    } catch (error) {
      console.error("Follow OA error:", error);
      throw error;
    }
  },

  authorizePhoneName: async () => {
    try {
      const dataAuth = await getSetting({});

      const authUserInfo = dataAuth.authSetting["scope.userInfo"];
      const authPhone = dataAuth.authSetting["scope.userPhonenumber"];
      const scopes: any[] = [];
      if (!authUserInfo) scopes.push("scope.userInfo");
      if (!authPhone) scopes.push("scope.userPhonenumber");
      if (scopes.length > 0) {
        await authorize({
          scopes: scopes,
        });
      }
    } catch (error) {
      console.error("Authorize error:", error);
      throw error;
    }
  },

  getPhone: async () => {
    try {
      // Development
      if (MODE.toLowerCase() === "development") {
        return new PhoneModel("0913216520");
      }
      const { token: zaloToken } = await getPhoneNumber();
      const endpoint = "https://graph.zalo.me/v2.0/me/info";
      // const accessTokenZlo =
      //   (await getAccessToken({})) || import.meta.env.VITE_ZALO_APP_TOKEN;
      const authDataSource = createAuthDataSource();
      const { accessToken: accessTokenZlo } =
        await authDataSource.getTokenZaloCustom();
      const zaloSecretKey = import.meta.env.VITE_APP_SECRET;

      const options = {
        headers: {
          access_token: accessTokenZlo,
          code: zaloToken,
          secret_key: zaloSecretKey,
        },
      };

      const res = await axios.get(endpoint, options);

      let phone = "";
      if (res.data?.data?.number) {
        const formattedPhone = res.data?.data?.number?.startsWith("84")
          ? "0" + res.data?.data?.number.slice(2)
          : res.data?.data?.number;
        phone = formattedPhone;
      }

      return new PhoneModel(phone);
    } catch (error) {
      console.error("Get phone error:", error);
      throw error;
    }
  },

  getZaloInfo: async () => {
    try {
      const { userInfo } = await getUserInfo();
      return new ZaloInfoModel(
        userInfo?.name,
        userInfo?.avatar,
        userInfo?.idByOA,
        userInfo?.followedOA,
      );
    } catch (error) {
      console.error("Get Zalo info error:", error);
      throw error;
    }
  },

  getLocationUser: async () => {
    try {
      if (MODE.toLowerCase() === "development") {
        // return {
        //   data: {
        //     data: {
        //       latitude: "2",
        //       longitude: "1",
        //     },
        //   },
        // };
        return new LocationModel(
          "",
          parseFloat("233.5") || 0,
          parseFloat("123.4") || 0,
          "",
        );
      }

      const dataAuth = await getSetting({});

      const authUserLocation = dataAuth.authSetting["scope.userLocation"];
      const scopes: any[] = [];
      if (!authUserLocation) scopes.push("scope.userLocation");
      if (scopes.length > 0) {
        await authorize({
          scopes: scopes,
        });
      }
      const { token } = await getLocation({});
      const endpoint = "https://graph.zalo.me/v2.0/me/info";
      const authDataSource = createAuthDataSource();

      const { accessToken: accessTokenZlo } =
        await authDataSource.getTokenZaloCustom();
      const secretKey = import.meta.env.VITE_APP_SECRET;

      const options = {
        headers: {
          access_token: accessTokenZlo,
          code: token,
          secret_key: secretKey,
        },
      };
      const res = await axios.get(endpoint, options);

      return new LocationModel(
        res.data?.data?.provider || "",
        parseFloat(res.data?.data?.latitude) || 0,
        parseFloat(res.data?.data?.longitude) || 0,
        res.data?.data?.timestamp || "",
      );
    } catch (error) {
      console.error("Get Zalo location error:", error);
      throw error;
    }
  },
});
