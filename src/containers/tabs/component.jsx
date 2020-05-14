import React from "react";

import "./style.sass";

const Tabs = ({ children, tabs }) => {
  return (
    <div className="ui-tabs">
      <div className="ui-tabs_tabsContainer">
        {tabs.map((item, index) => (
          <div key={index}></div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default React.memo(Card);
