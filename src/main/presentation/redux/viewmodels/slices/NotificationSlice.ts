import { createSlice } from "@reduxjs/toolkit";
import { NotificationItem } from "../../../../core/entities/Notification";
import logo from "../../../static/icons/logo.png";

export interface NotificationState {
  list: NotificationItem[];
  isLoading: boolean;
}

const initialState: NotificationState = {
  list: [
    {
      id: "1",
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: "2",
      image: logo,
      title: "Giảm 50% lần đầu mua hàng",
      content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    },
  ],
  isLoading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;
