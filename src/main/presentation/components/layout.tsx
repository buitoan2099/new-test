import { useContext, useEffect } from "react";
import { AppContext, useResumed } from "../context/AppContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "zmp-ui";
import { createPortal } from "react-dom";
import { getUserID, nativeStorage } from "zmp-sdk";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import LockIcon from "../static/icons/lock-icon.png";
import { ToastContainer } from "react-toastify";
import { handleApiError } from "../utils/handleError";
import { notify } from "./notification/notify";
import { Navigation } from "../pages/navigation";

const CODE_APP = import.meta.env.VITE_CODE_APP || "";
const MODE = import.meta.env.MODE || "";

export const Layout = () => {
  const {
    setUser,
    sessionId,
    setSessionId,
    setResLockScreen,
    setIsOpenLockScreen,
    setImageBanner,
    setZaloId,
    isOpenLockScreen,
  } = useContext(AppContext);
  const navigate = useNavigate();

  // const zaloRepository = createUserRepository(); // Create the user repository
  // const checkExist = createCheckExistUseCase(userRepository);

  useResumed(({ path }) => {
    if (path) {
      navigate(path);
    }
  });

  const handleInitApp = async () => {
    const resUserID = await getUserID();
    if (resUserID) {
      setZaloId(resUserID);
    }
  };

  useEffect(() => {
    // navigate("/login", { replace: true });
  }, []);

  // const handleCheckExist = async (currentSessionId) => {
  //   try {
  //     const res = await checkExist(currentSessionId);
  //     // k cần gọi getUser vì k cần dùng, chủ yếu là biến để pass thôi
  //     if (res?.error) {
  //       navigate("/login", { replace: true });

  //       return;
  //     }

  //     setUser(res?.result?.consumer);
  //     const id = res?.result?.consumer?.id;
  //     const idLocal = String(nativeStorage.getItem("idConsumer"));
  //     if (idLocal && id) {
  //       if (idLocal !== String(id)) {
  //         nativeStorage.removeItem("regretIds");
  //         // nativeStorage.removeItem("endedIds");
  //       }
  //     }
  //     nativeStorage.setItem("idConsumer", String(id));
  //   } catch (error: any) {
  //     const goError = handleApiError(error);

  //     if (goError) {
  //       navigate("/error-page", { replace: true });
  //       return;
  //     } else {
  //       navigate("/login", { replace: true });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const init = async () => {
  //     const resCode = await getCustomAppId(CODE_APP);
  //     const MODE = import.meta.env.MODE || "";
  //     if (resCode?.success) {
  //       const id = resCode?.result?.id || "";
  //       if (!id) return;
  //       if (MODE === "development") {
  //         localStorage.setItem("CUSTOM_APP_ID", String(id));
  //       } else [nativeStorage.setItem("CUSTOM_APP_ID", String(id))];
  //       const uuid = uuidv4();
  //       const currentSessionId = sessionId || uuid;
  //       if (!sessionId) setSessionId(uuid);

  //       handleCheckExist(currentSessionId);
  //       handleInitApp();
  //     } else {
  //       notify(resCode?.error?.message || "", "error");
  //     }
  //   };
  //   init();
  // }, []);

  return (
    <Box flex flexDirection="column" className="h-screen">
      {createPortal(
        <ModalLockScreen isOpen={isOpenLockScreen} />,
        document.body,
      )}

      <Box className="flex flex-1 flex-col overflow-hidden">
        <Outlet />
        <ToastContainer style={{ marginTop: "48px" }} />
      </Box>
      <Navigation />
    </Box>
  );
};

export const ModalLockScreen = ({ isOpen }) => {
  if (!isOpen) return null;
  const { resLockScreen } = useContext(AppContext);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#FFFFFF66]"
      style={{
        zIndex: 1000,
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        paddingTop: "calc(var(--zaui-safe-area-inset-top, 0px) + 44px)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex w-[319px] flex-col items-center"
        onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan đến div cha
      >
        <img
          src={LockIcon}
          className="relative w-[93px] min-w-[93px] object-contain"
          style={{
            zIndex: 12,
          }}
        />

        <div
          className="w-full px-[24px] pb-[56px] pt-[72px] text-center text-white"
          style={{
            transform: "translateY(-46.5px)",
            background: "#F5F9FF",
            borderRadius: "24px",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: resLockScreen?.description }}
          ></div>
        </div>
      </div>
    </div>
  );
};
