import React, { memo } from "react";
import { useSelector } from "react-redux";

import "./style.sass";

import Drawer from "./components/drawer";
import ThemeStyle from "../../constants/themingStyles";

const PageWithHeaderComponent = ({
  drawerVisible,
  drawerItems,
  handleDrawerVisible,
  title,
  subtitle,
  children,
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const style = { marginLeft: drawerVisible ? "220px" : "70px" };
  const styleByTheme = ThemeStyle[theme];

  return (
    <Drawer
      drawerVisible={drawerVisible}
      drawerItems={drawerItems}
      handleDrawerVisible={handleDrawerVisible}
    >
      <div className="pageWithHeader" style={style}>
        <div className="header" style={styleByTheme}>
          <div className="headerContent">
            <div className="headerTitle">{title}</div>

            {subtitle && <div className="headerSubtitle">/{subtitle}</div>}
          </div>
        </div>

        <div className="body" style={styleByTheme}>
          {children}
        </div>
      </div>
    </Drawer>
  );
};

export default memo(PageWithHeaderComponent);
