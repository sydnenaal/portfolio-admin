import React from "react";

import "./style.sass";

const BarsIcon = ({ handleDrawerVisible, drawerVisible, color }) => {
  const style = { backgroundColor: color };
  return (
    <div
      className="sidebar-item__icon icon_header"
      onClick={handleDrawerVisible}
    >
      <div id="nav-icon4" className={drawerVisible ? " open" : ""}>
        <span style={style}></span>

        <span style={style}></span>

        <span style={style}></span>
      </div>
    </div>
  );
};

export default BarsIcon;
