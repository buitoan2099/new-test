import React, { FC } from "react";
import { Box, Header, Icon, Page, Text, useSnackbar } from "zmp-ui";
import { ListRenderer } from "../components/list-renderer";
import {
  useAppDispatch,
  useAppSelector,
  useToBeImplemented,
} from "../redux/store/hooks";
import { UserInfo } from "../../core/entities/User";
import { LocationData } from "../../core/entities/Zalo";
import { followOaEvent } from "../redux/viewmodels/events/UpdateZaloInfoEvents";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

const Personal: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-4">
      <ListRenderer
        title="Cá nhân"
        onClick={onClick}
        items={[
          {
            left: <Icon icon="zi-user" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Thông tin tài khoản
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-clock-2" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Lịch sử đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Other: FC = () => {
  const onClickData = useToBeImplemented();
  const snackbar = useSnackbar();
  const dispatch = useAppDispatch();

  const handelFollowOA = async () => {
    console.log("Follow OA Zalo MiniApp");
    const res = await dispatch(followOaEvent());
    console.log("Follow OA result:", res);
    console.log(followOaEvent.fulfilled.match(res));
    console.log(followOaEvent.rejected.match(res));

    if (followOaEvent.fulfilled.match(res)) {
      snackbar.openSnackbar({
        type: "success",
        text: "Followed OA successfully",
      });
    }

    if (followOaEvent.rejected.match(res)) {
      snackbar.openSnackbar({
        type: "error",
        text: "Followed OA failed",
      });
    }
  };

  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        onClick={(item) => {
          if (item.id === "follow-oa") {
            handelFollowOA();
          } else {
            onClickData();
          }
        }}
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Đánh giá đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-call" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Liên hệ và góp ý
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            id: "follow-oa",
            onClick: handelFollowOA,
            left: <Icon icon="zi-play" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 items-center font-normal">
                  Follow OA Zalo MiniApp
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  const users = useAppSelector((state) => state.auth?.user || {}) as UserInfo;
  const location = useAppSelector(
    (state) => state.auth?.location || {},
  ) as LocationData;

  return (
    <Page>
      <Header showBackIcon={false} title="&nbsp;" />
      <div>
        <Text.Title className="text-left mt-4 text-2xl font-bold ml-8">
          {users?.name ?? ""}
        </Text.Title>
        <Text className="text-left mt-2 text-base font-bold text-gray-600 ml-8 text-[14px]">
          {users?.phone ?? ""}
        </Text>
        <Text className="text-left mt-1 text-base text-gray-500 ml-8 text-[12px]">
          Latitude: {location.latitude}
        </Text>
        <Text className="text-left mt-1 text-base text-gray-500 ml-8 text-[12px]">
          Longitude: {location.longitude}
        </Text>
      </div>
      <Personal />
      <Other />
    </Page>
  );
};

export default ProfilePage;
