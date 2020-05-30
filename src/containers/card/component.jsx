import React from "react";
import { useSelector } from "react-redux";

import "./style.sass";

const Card = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const style = {
    borderColor: theme === "light" ? "rgba(0,0,0, 0.15)" : "gray",
  };

  return (
    <div className="ui-card" style={style}>
      {children}
    </div>
  );
};

export default React.memo(Card);
