import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import "./style.sass";

const Card = ({ children, style, padding = "3px" }) => {
  const theme = useSelector((state) => state.theme.theme);

  const mergeStyles = useMemo(
    () => ({
      ...style,
      padding: padding,
      borderColor: theme === "light" ? "rgba(0,0,0, 0.15)" : "gray",
    }),
    [theme, padding, style]
  );

  return (
    <div className="ui-card" style={mergeStyles}>
      {children}
    </div>
  );
};

export default React.memo(Card);
