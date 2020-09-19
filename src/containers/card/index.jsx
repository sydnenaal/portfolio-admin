import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { selectTheme } from "selectors";
import "./style.sass";

function Card({ children, style, padding = "3px" }) {
  const theme = useSelector(selectTheme);
  const mergeStyles = useMemo(() => {
    const colorByTheme = theme === "light" ? "rgba(0,0,0, 0.15)" : "gray";

    return { ...style, padding, borderColor: colorByTheme };
  }, [theme, padding, style]);

  return (
    <div className="ui-card" style={mergeStyles}>
      {children}
    </div>
  );
}

export default React.memo(Card);
