import React from "react";

import "./style.sass";

const Card = ({ children }) => {
  return <div className="ui-card">{children}</div>;
};

export default React.memo(Card);
