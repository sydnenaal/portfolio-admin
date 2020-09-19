import React, { useMemo, memo } from "react";
import { Icon } from "semantic-ui-react";

import "./style.sass";

function DrawerItem({ handleClick, item }) {
  const {
    location: { pathname },
  } = useHistory();
  const itemStyle = useMemo(() => ({ backgroundColor: "#333" }), []);

  return (
    <div
      className="sidebar-item"
      onClick={handleClick.bind(item)}
      style={pathname === item.path ? itemStyle : {}}
    >
      <div className="sidebar-item__icon">
        <Icon name={item.icon} size="big" />
      </div>

      <div className="sidebar-item__title">{item.title}</div>
    </div>
  );
}

export default memo(DrawerItem);
