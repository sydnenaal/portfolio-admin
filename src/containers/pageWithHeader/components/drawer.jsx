import React from "react";
import { useIntl } from "react-intl";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { drawerItems } from "../../../constants/drawerConstants";

const DrawerComponent = ({ handleDrawerVisible, drawerVisible, children }) => {
  const {
    messages: { titles },
  } = useIntl();

  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/auth");
  };

  function handleClick() {
    history.push(this.path);
    handleDrawerVisible();
  }

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        vertical={true}
        visible={drawerVisible}
        width="thin">
        {drawerItems(titles).map((item, index) => (
          <Menu.Item
            onClick={
              item.path === "/auth" ? handleLogout : handleClick.bind(item)
            }
            key={index}>
            <Icon name={item.icon} />
            {item.title}
          </Menu.Item>
        ))}
      </Sidebar>

      <Sidebar.Pusher style={{ overflow: "visible" }}>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default DrawerComponent;
