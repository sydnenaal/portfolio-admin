import React from "react";
import { connect } from "react-redux";

import "./style.sass";

const Card = ({ children, theme }) => {
  const style = {
    borderColor: theme === "light" ? "rgba(0,0,0, 0.15)" : "gray",
  };
  return (
    <div className="ui-card" style={style}>
      {children}
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, null)(React.memo(Card));
