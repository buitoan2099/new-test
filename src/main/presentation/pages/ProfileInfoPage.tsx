// src/features/avatar/components/AvatarUploader.jsx
import React, { useState, useEffect, FC } from "react";
import {
  Page,
  Box,
  Button,
  Text,
  Avatar,
  Spinner,
  Icon,
  Header,
  Input,
} from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import {
  chooseImageEvent,
  uploadAvatar,
} from "../redux/viewmodels/events/UpdateImageEvents";
import { clearTempSelectedImage } from "../redux/viewmodels/slices/AuthSlice";
import appConfig from "../../../../app-config.json";
import { getConfig } from "../../../utils/config";
import logo from "../static/icons/logo.png";

const ProfileInfoPage: FC = () => {
  const dispatch = useAppDispatch();
  const { avatarUrl, tempSelectedImagePath, isLoading } = useAppSelector(
    (state) => state.auth!,
  );

  const handleSelectImage = () => {
    dispatch(chooseImageEvent());
  };

  const handleConfirmUpload = () => {
    if (tempSelectedImagePath) {
      dispatch(uploadAvatar());
    }
  };

  const handleCancelUpload = () => {
    dispatch(clearTempSelectedImage());
  };

  // Hiển thị ảnh tạm nếu có, ngược lại hiển thị avatar chính thức
  const displayAvatar = tempSelectedImagePath || avatarUrl;

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Header
        className="app-header no-border pl-4 flex-none pb-[3px]"
        showBackIcon={true}
        title={
          (
            <Box flex alignItems="center" className="space-x-2">
              <img
                className="w-8 h-8 rounded-lg border-inset"
                src={getConfig((c) => c.template.headerLogo) || logo}
              />
              <Box>
                <Text.Title size="small">{appConfig.app.title}</Text.Title>
              </Box>
            </Box>
          ) as unknown as string
        }
      />
      <Box className="flex flex-col items-center justify-center h-screen">
        <Box className="relative mb-8">
          {/* Avatar hiển thị */}
          <Avatar
            size={150}
            src={displayAvatar}
            className="border-4 border-primary rounded-full"
          />
          {isLoading && (
            <Box className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <Spinner />
            </Box>
          )}
        </Box>

        {/* {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>} */}

        {!tempSelectedImagePath ? (
          // Nút chọn ảnh mới khi chưa có ảnh tạm

          <Button
            type="highlight"
            style={{
              background: "linear-gradient(90deg, #22c55e 0%, #4ade80 100%)", // xanh (selected)
              color: "#fff",
              borderRadius: "999px",
              height: 44,
              transition: "all 0.25s ease",
            }}
            loading={isLoading} // Tạm dùng loading cho chọn ảnh nếu Zalo SDK có độ trễ
            onClick={handleSelectImage}
          >
            Chọn ảnh mới
          </Button>
        ) : (
          // Các nút xác nhận/hủy khi đã chọn ảnh tạm
          <Box className="flex space-x-4">
            <Button
              onClick={handleConfirmUpload}
              // className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md"
              style={{
                backgroundColor: "#22c55e", // bg-green-500
                color: "#ffffff", // text-white
                padding: "8px 16px", // py-2 px-4
                borderRadius: "8px", // rounded-lg
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // shadow-md
              }}
              loading={isLoading}
              disabled={isLoading}
            >
              <Icon icon="zi-check" className="mr-2" /> Xác nhận
            </Button>
            <Button
              type="highlight"
              onClick={handleCancelUpload}
              // className="bg-[#E5E7EB] text-white py-2 px-4 rounded-lg shadow-md"
              style={{
                backgroundColor: "#D1D5DB", // bg-gray-300
                color: "#1F2937",
                padding: "8px 16px", // py-2 px-4
                borderRadius: "8px", // rounded-lg
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // shadow-md
              }}
              disabled={isLoading}
            >
              <Icon icon="zi-close" className="mr-2" /> Hủy
            </Button>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default ProfileInfoPage;
