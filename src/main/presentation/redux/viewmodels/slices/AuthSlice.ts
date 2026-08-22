import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../../../core/entities/User";
import { handleLogInEvent } from "../events/LogInOutEvents";
import { LocationData } from "../../../../core/entities/Zalo";
import { followOaEvent } from "../events/UpdateZaloInfoEvents";
import { chooseImageEvent, uploadAvatar } from "../events/UpdateImageEvents";

let initUser = {};

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserInfo;
  message: string | null;
  location: LocationData;
  tempSelectedImagePath: string | undefined;
  avatarUrl: string | undefined;
}

const initialState: AuthState = {
  user: initUser as UserInfo,
  isLoading: false,
  isLoggedIn: false,
  message: null,
  location: {} as LocationData,
  tempSelectedImagePath: undefined,
  avatarUrl:
    "https://thichtrangtri.com/wp-content/uploads/2025/05/anh-meo-gian-cute-3.jpg",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAvatarUrl: (state, action) => {
      state.avatarUrl = action.payload;
    },
    clearTempSelectedImage: (state) => {
      state.tempSelectedImagePath = undefined;
    },
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(handleLogInEvent.pending, (state) => {
        state.isLoading = true;
        state.message = null;
        state.isLoggedIn = false;
      })
      .addCase(handleLogInEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload["user"];
        state.location = action.payload["location"];
        state.isLoggedIn = true;
        console.log("Login successful:", action.payload);
        console.log("Login successful:", state.isLoggedIn);
      })
      .addCase(handleLogInEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload as string;
        state.isLoggedIn = false;
      });
    //login
    builder
      .addCase(followOaEvent.pending, (state) => {
        state.message = null;
        state.isLoading = true;
      })
      .addCase(followOaEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload["message"];
      })
      .addCase(followOaEvent.rejected, (state, action) => {
        state.isLoading = false;
        // state.message = action.payload as string;
        state.message = "Follow OA failed";
      });
    //image
    builder
      // Xử lý khi bắt đầu chọn ảnh
      .addCase(chooseImageEvent.pending, (state) => {
        // state.error = null;
      })
      .addCase(chooseImageEvent.fulfilled, (state, action) => {
        state.tempSelectedImagePath = action.payload; // Lưu đường dẫn ảnh tạm
      })
      .addCase(chooseImageEvent.rejected, (state, action) => {
        // state.error = action.payload;
      })

      // Xử lý khi bắt đầu upload
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        // state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatarUrl = !action.payload
          ? state.tempSelectedImagePath
          : action.payload; // Cập nhật URL avatar chính thức
        state.tempSelectedImagePath = undefined; // Xóa ảnh tạm sau khi upload
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
      });
  },
});

export const { setAvatarUrl, clearTempSelectedImage } = authSlice.actions;
export default authSlice.reducer;
