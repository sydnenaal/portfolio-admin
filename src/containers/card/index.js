import React from "react";

import CardComponent from "./component";

import "./style.sass";

const CardContainer = (props) => {
  return <CardComponent {...props} />;
};

export default React.memo(CardContainer);
