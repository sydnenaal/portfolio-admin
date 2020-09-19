import React, { memo } from "react";

import "./style.sass";

function Tabs({ tabs = [], children }) {
  return (
    <div className="ui-tabs">
      <div className="ui-tabs_tabsContainer">{tabs}</div>
      <div className="ui-tabs_content">{children}</div>
    </div>
  );
}

export default memo(Tabs);
