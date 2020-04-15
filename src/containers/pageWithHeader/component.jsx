import React, { useContext } from "react";
import { Icon } from "semantic-ui-react";

import "./style.sass";

import Drawer from "./components/drawer";
import ThemeContext from "../../contexts/theme";
import ThemeStyle from "../../constants/themingStyles";

const PageWithHeaderComponent = ({
  drawerVisible,
  drawerItems,
  handleDrawerVisible,
  title,
  children,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Drawer
      drawerVisible={drawerVisible}
      drawerItems={drawerItems}
      handleDrawerVisible={handleDrawerVisible}>
      <div className="pageWithHeader">
        <div className="header" style={ThemeStyle[theme]}>
          <div className="headerContent">
            <div className="drawerButton" onClick={handleDrawerVisible}>
              <Icon name="bars" size="big" cursor="pointer" />
            </div>

            <div className="headerTitle">{title}</div>
          </div>
        </div>

        <div className="body" style={ThemeStyle[theme]}>
          {children}
        </div>
      </div>
    </Drawer>
  );
};

export default PageWithHeaderComponent;
