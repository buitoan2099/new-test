import React, { FC } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessIcon from "../../static/icons/success-icon-toast.svg";
import WarnIcon from "../../static/icons/warn-icon.svg";
import ErrorIcon from "../../static/icons/error-icon.svg";
import InfoIcon from "../../static/icons/info-icon.svg";

const CustomToast: FC<any> = ({ message, level, closeToast }) => {
  const levelStyles = {
    success: "bg-green-50 border-green-100 text-green-600",
    error: "bg-red-50 border-red-100 text-red-600",
    info: "bg-blue-50 border-blue-100 text-blue-600",
    warning: "bg-yellow-50 border-yellow-100 text-yellow-600",
  };

  return (
    <div
      className={`flex items-center rounded-md border p-4 shadow-md ${levelStyles[level]}`}
    >
      <div className="mr-4 text-2xl">
        {level === "success" ? <img src={SuccessIcon} /> : null}
        {level === "error" ? <img src={ErrorIcon} /> : null}
        {level === "info" ? <img src={InfoIcon} /> : null}
        {level === "warning" ? <img src={WarnIcon} /> : null}
      </div>
      <div>
        <div className="font-semibold">
          {/* {level.charAt(0).toUpperCase() + level.slice(1)} */}
          {level === "error"
            ? "Báo lỗi"
            : level === "info"
              ? "Thông báo"
              : level === "warning"
                ? "Cảnh báo"
                : level === "success"
                  ? "Thành công"
                  : null}
        </div>
        <div className="text-sm text-[#3A3E42]">{message}</div>
      </div>
      <div
        className="ml-auto cursor-pointer text-gray-400 hover:text-gray-600"
        onClick={closeToast}
      >
        &#x2715;
      </div>
    </div>
  );
};

export const notify = (message: string, level: string) => {
  toast(<CustomToast message={message} level={level} />, {
    className: "p-0 bg-transparent!",
    closeButton: false,
    hideProgressBar: true,
    pauseOnHover: false, // Không tạm dừng khi di chuột vào
    pauseOnFocusLoss: false, // Không tạm dừng khi mất tiêu điểm
    autoClose: 3500,
    progress: 0,
    style: { background: "transparent", border: "none", boxShadow: "none" },
  });
};
