import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "semantic-ui-react";

import "../style.sass";
import { setTheme } from "ducks";

const ChangeTheme = ({ locale }) => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme);
  }, [dispatch, theme]);

  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <div id="theme">
      <p>{locale.settings.theme}</p>
      <Radio slider checked={isDark} onChange={handleChangeTheme} />
    </div>
  );
};

export default ChangeTheme;
