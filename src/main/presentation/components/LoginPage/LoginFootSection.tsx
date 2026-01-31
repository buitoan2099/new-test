import React from "react";
import LoginFooter from "../../static/images/login-foot.png";

const LoginFootSection: React.FC<{
  onClick: () => void;
  isLoading: boolean;
}> = ({ onClick, isLoading }) => {
  return (
    <div
      className="fixed bottom-[0] left-0 right-0 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${LoginFooter})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        height: "200px",
        // paddingTop: "110px",
      }}
    >
      <div
        className="mt-1 flex h-[43px] w-[205px] items-center justify-center rounded-[100px] text-[18px] text-[#FFFFFF]"
        style={{
          border: "2px solid #9CD5B4",
          background: "linear-gradient(90deg, #3DAC7866 0%, #BCE5C766 100%)",
          // boxShadow: "0px 4px 0px 0px #DEB511",
        }}
        onClick={isLoading ? undefined : onClick}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        ) : (
          "Tham gia ngay"
        )}
      </div>
    </div>
  );
};

export default LoginFootSection;
