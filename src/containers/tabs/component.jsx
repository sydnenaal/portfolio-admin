import React from "react";

import "./style.sass";

const Tabs = ({ tabs = [], children }) => {
  return (
    <div className="ui-tabs">
      <div className="ui-tabs_tabsContainer">{tabs}</div>
      <div className="ui-tabs_content">{children}</div>
    </div>
  );
};

export default React.memo(Tabs);
