import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "semantic-ui-react";

import "../style.sass";
import { setTheme } from "redux/actions";

const ChangeTheme = ({ locale }) => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme);
  };

  const isDark = theme === "dark";

  return (
    <div id="theme">
      <p>{locale.settings.theme}</p>
      <Radio slider checked={isDark} onChange={handleChangeTheme} />
    </div>
  );
};

export default ChangeTheme;
