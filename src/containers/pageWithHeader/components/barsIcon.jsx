import React from "react";

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

export default BarsIcon;
