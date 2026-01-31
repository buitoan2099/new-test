import React, { useCallback } from "react";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { Events, events, getRouteParams } from "zmp-sdk";
import { Spinner } from "zmp-ui";

interface IThemColor {
  [key: string]: any;
}

interface IUser {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}

export enum LoadingState {
  themeColor = "themeColor", // Loading user when enter the app
  user = "user",
  htmlText = "htmlText",

  navigateLoading = "navigateLoading",

  loadingDataApi = "loadingDataApi",
}

type ILoading = Record<LoadingState, boolean>;

interface IAppContext {
  loading: ILoading;
  setLoading: React.Dispatch<React.SetStateAction<ILoading>>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  userZalo: IUser | null;
  setUserZalo: React.Dispatch<React.SetStateAction<IUser | null>>;
  phone: any;
  setPhone: React.Dispatch<React.SetStateAction<any>>;
  name: any;
  setName: React.Dispatch<React.SetStateAction<any>>;
  zaloId: any;
  setZaloId: React.Dispatch<React.SetStateAction<string>>;
  avatarZalo: null;
  setAvatarZalo: React.Dispatch<React.SetStateAction<any>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  imageBanner: any;
  setImageBanner: React.Dispatch<React.SetStateAction<any>>;
}

const initializeLoadingState = (states: typeof LoadingState): ILoading => {
  return Object.values(states).reduce((acc, state) => {
    acc[state] = false;
    return acc;
  }, {} as ILoading);
};

export const AppContext = createContext<any>(null);

const paramtUtm: { current: Record<string, any> } = { current: {} };

// Hàm để lấy giá trị themeColor hiện tại
export const getParamUtm = () => paramtUtm.current;

export const useResumed = (callback: (params: { path: string }) => void) => {
  useEffect(() => {
    events.on(Events.OpenApp, callback);
    return () => {
      events.off(Events.OpenApp, callback);
    };
  }, []);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userZalo, setUserZalo] = useState<IUser | null>(null);
  const [phone, setPhone] = useState<any>("");
  const [loading, setLoading] = useState<ILoading>(
    initializeLoadingState(LoadingState)
  );
  const [paramsUtms, setParamUtms] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pathShare, setPathShare] = useState<any>("");
  const [zaloId, setZaloId] = useState<string>("1");
  const [isOpenLockScreen, setIsOpenLockScreen] = useState<boolean>(false);
  const [resLockScreen, setResLockScreen] = useState<any>(null);
  const [avatarZalo, setAvatarZalo] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [imageBanner, setImageBanner] = useState<any>(null);

  const paramtUtm = useRef<any>({}); // Dùng ref để tránh re-render khi chỉ update data ngầm

  // --- 2. Xử lý logic URL Params một lần duy nhất ---
  useEffect(() => {
    const params = getRouteParams();
    if (!params) return;

    // Kiểm tra và lưu UTM
    const utmKeys = [
      "pango_source_c",
      "pango_campaign_c",
      "pango_medium_c",
      "utm_source",
      "utm_campaign",
      "utm_medium",
    ];
    const hasUtm = utmKeys.some((key) => params[key]);

    if (hasUtm) {
      paramtUtm.current = { ...paramtUtm.current, ...params };
    }

    if (params.ref) {
      setReferralCode(params.ref);
    }
  }, []); // Chỉ chạy khi App khởi tạo

  useEffect(() => {
    if (userZalo?.name) {
      paramtUtm.current = { ...paramtUtm.current, name: userZalo?.name };
    }
    if (userZalo?.phone) {
      paramtUtm.current = { ...paramtUtm.current, phone: userZalo?.phone };
    }
  }, [userZalo]);

  useEffect(() => {
    if (sessionId) {
      paramtUtm.current = {
        ...paramtUtm.current,
        session_id: sessionId,
      };
    }
  }, [sessionId]);

  const getParamUtmCallback = useCallback(() => paramtUtm.current, []);

  // Memoize provider value to avoid unnecessary re-renders for consumers
  const value = useMemo(
    () => ({
      loading,
      setLoading,
      user,
      setUser,
      phone,
      setPhone,
      userZalo,
      setUserZalo,
      name,
      setName,
      zaloId,
      setZaloId,
      paramsUtms,
      setParamUtms,
      isOpenLockScreen,
      setIsOpenLockScreen,
      resLockScreen,
      setResLockScreen,
      avatarZalo,
      setAvatarZalo,
      sessionId,
      setSessionId,
      pathShare,
      setPathShare,
      referralCode,
      setReferralCode,
      imageBanner,
      setImageBanner,
      getParamUtm: getParamUtmCallback,
    }),
    [
      loading,
      user,
      userZalo,
      phone,
      name,
      zaloId,
      paramsUtms,
      isOpenLockScreen,
      resLockScreen,
      avatarZalo,
      sessionId,
      pathShare,
      referralCode,
      imageBanner,
      getParamUtmCallback,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {loading?.themeColor ? (
        <div className="flex h-[100vh] w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};
