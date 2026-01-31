import React, { FC } from "react";
import { Page } from "zmp-ui";
import { requestUpdateZalo } from "zmp-sdk/apis";
import ErrorIcon from "../static/icons/error-icon-zmp.svg";

const ErrorZmpPage: FC = () => {
  return (
    <Page className="font-cosa relative flex flex-col bg-white">
      <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <img src={ErrorIcon} className="mb-6 mt-[-100px] h-32 w-32" />
        <h2 className="mb-2 text-lg font-bold text-[#413B3B]">
          Ứng dụng hiện không thể sử dụng
        </h2>

        <p className="mb-4 text-sm text-[#535850]">
          Phiên bản Zalo bạn đang dùng chưa hỗ trợ một số tính năng cần thiết để
          chạy Mini App này.
        </p>

        <p className="mb-6 text-sm text-[#535850]">
          Vui lòng cập nhật Zalo lên phiên bản mới nhất để tiếp tục sử dụng ứng
          dụng.
        </p>

        <div
          className="mt-[20px] mb-[px] flex h-[38px] w-full items-center justify-center rounded-full text-[14px] font-medium leading-[14px] text-[#ffffff]"
          style={{
            background: "linear-gradient(90deg, #D3A900 0%, #FFD721 100%)",
            boxShadow: "0px 4px 0px 0px #DEB511",
          }}
          onClick={async () => {
            await requestUpdateZalo({});
          }}
        >
          Cập nhật ứng dụng Zalo ngay
        </div>
      </div>
    </Page>
  );
};

export default ErrorZmpPage;
