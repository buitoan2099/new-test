import { createAsyncThunk } from "@reduxjs/toolkit";
import di from "../../../../di";
import { chooseImage } from "zmp-sdk";
import { RootState } from "../../store/store";

//follow OA
export const chooseImageEvent = createAsyncThunk(
  "/choose-image",
  async (_, { rejectWithValue }) => {
    try {
      // Chọn ảnh từ thư viện
      const { filePaths } = await chooseImage({
        sourceType: ["album", "camera"],
        cameraType: "back",
        count: 1,
      });

      if (filePaths && filePaths.length > 0) {
        // Zalo Mini App SDK thường trả về local path hoặc base64 data URL.
        // Với chooseImage, thường trả về local path để dùng với uploadFile.
        return filePaths[0]; // Trả về đường dẫn của ảnh đã chọn
      }
      return rejectWithValue("No image selected.");
    } catch (error) {
      console.error("Error selecting image from Zalo:", error);
      return rejectWithValue("Failed to select image.");
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  "avatar/uploadAvatar",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState; // Lấy trạng thái hiện tại từ Redux store

      const selectedImageFilePath = state.auth?.tempSelectedImagePath; // Lấy đường dẫn ảnh tạm đã chọn

      if (!selectedImageFilePath) {
        throw new Error("No image selected to upload.");
      }

      // Giả định uploadAvatarUseCase.execute nhận filePath
      const newAvatar = await di.changeAvatarUseCase.execute(
        selectedImageFilePath!,
      );
      return newAvatar.url; // Trả về URL của avatar mới
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
