import React, { useContext } from "react";

import SettingsPageComponent from "./component";
import ThemeContext from "../../contexts/theme";

const SettingsPageContainer = ({ changeTheme, setLanguage, ...props }) => {
  const theme = useContext(ThemeContext);

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleChangeLanguage = (e, data) => {
    const { value } = data;
    localStorage.setItem("lang", value);
    setLanguage(value);
  };

  const isDark = theme === "dark";

  return (
    <SettingsPageComponent
      isDark={isDark}
      handleChangeTheme={handleChangeTheme}
      handleChangeLanguage={handleChangeLanguage}
      {...props}
    />
  );
};

export default SettingsPageContainer;
