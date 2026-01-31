import { MenuItem } from "../../core/entities/Menu";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation, Icon } from "zmp-ui";
import { useVirtualKeyboardVisible } from "../redux/store/hooks";

const tabs: Record<string, MenuItem> = {
  "/main/home": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/main/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={location.pathname}
      onChange={navigate}
      className="z-54 border-t border-gray-200"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
        />
      ))}
    </BottomNavigation>
  );
};
