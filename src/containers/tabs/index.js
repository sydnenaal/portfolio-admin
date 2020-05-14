import React from "react";

import TabsComponent from "./component";

import "./style.sass";

const TabsContainer = (props) => {
  return <TabsComponent {...props} />;
};

export default React.memo(TabsContainer);
