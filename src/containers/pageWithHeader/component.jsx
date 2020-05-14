import React, { useContext } from "react";

import "./style.sass";

import Drawer from "./components/drawer";
import ThemeContext from "../../contexts/theme";
import ThemeStyle from "../../constants/themingStyles";

const PageWithHeaderComponent = ({
  drawerVisible,
  drawerItems,
  handleDrawerVisible,
  title,
  subtitle,
  children,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Drawer
      drawerVisible={drawerVisible}
      drawerItems={drawerItems}
      handleDrawerVisible={handleDrawerVisible}>
      <div
        className="pageWithHeader"
        style={{ marginLeft: drawerVisible ? "220px" : "70px" }}>
        <div className="header" style={ThemeStyle[theme]}>
          <div className="headerContent">
            <div className="headerTitle">{title}</div>

            {subtitle && <div className="headerSubtitle">/{subtitle}</div>}
          </div>
        </div>

        <div className="body" style={ThemeStyle[theme]}>
          {children}
        </div>
      </div>
    </Drawer>
  );
};

export default React.memo(PageWithHeaderComponent);
