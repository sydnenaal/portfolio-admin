import React from "react";
import { useIntl } from "react-intl";
import { Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { drawerItems } from "constants/drawerConstants";

const BarsIcon = ({ handleDrawerVisible, drawerVisible }) => {
  return (
    <div className="sidebar-item">
      <div
        className="sidebar-item__icon icon_header"
        onClick={handleDrawerVisible}
      >
        <div id="nav-icon4" className={drawerVisible ? " open" : ""}>
          <span></span>

          <span></span>

          <span></span>
        </div>
      </div>
    </div>
  );
};

const DrawerComponent = ({ handleDrawerVisible, drawerVisible, children }) => {
  const {
    messages: { titles },
  } = useIntl();

  const history = useHistory();

  const { pathname } = history.location;

  function handleClick() {
    if (this.path === "/auth") {
      localStorage.removeItem("token");
      history.push("/auth");
    } else {
      history.push(this.path);
      handleDrawerVisible();
    }
  }

  const handleMouseLeave = () => {
    drawerVisible && handleDrawerVisible();
  };

  const itemStyle = {
    backgroundColor: "#333",
  };

  const drawerStyle = { maxWidth: drawerVisible ? "220px" : "70px" };

  return (
    <div className="drawer">
      <div
        className="sidebar"
        style={drawerStyle}
        onMouseLeave={handleMouseLeave}
      >
        <BarsIcon
          handleDrawerVisible={handleDrawerVisible}
          drawerVisible={drawerVisible}
        />

        {drawerItems(titles).map((item, index) => (
          <div
            className="sidebar-item"
            onClick={handleClick.bind(item)}
            style={pathname === item.path ? itemStyle : {}}
            key={index}
          >
            <div className="sidebar-item__icon">
              <Icon name={item.icon} size="big" />
            </div>

            <div className="sidebar-item__title">{item.title}</div>
          </div>
        ))}
      </div>

      <>{children}</>
    </div>
  );
};

export default DrawerComponent;
