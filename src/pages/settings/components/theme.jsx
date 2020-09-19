import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "semantic-ui-react";

import "../style.sass";
import { selectTheme } from "selectors";
import { setTheme } from "ducks";

function ChangeTheme({ locale }) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const isDark = useMemo(() => theme === "dark", [theme]);

  const handleChangeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme);
  }, [dispatch, theme]);

  return (
    <div id="theme">
      <p>{locale.settings.theme}</p>
      <Radio slider checked={isDark} onChange={handleChangeTheme} />
    </div>
  );
}

export default ChangeTheme;
