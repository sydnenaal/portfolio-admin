import React, { useState, useContext } from "react";
import { NotificationManager } from "react-notifications";

import SettingsPageComponent from "./component";
import ThemeContext from "../../contexts/theme";

const SettingsPageContainer = ({ changeTheme, setLanguage, ...props }) => {
  const theme = useContext(ThemeContext);

  const [isPasswordChangeShow, setIsPasswordChangeShow] = useState(false);

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

  const handleReset = () => {
    try {
      localStorage.clear();
      NotificationManager.success("Произошел сброс настроек", "Сброс");
    } catch (err) {
      NotificationManager.error("Сброс не удался", "Сброс");
    }
  };

  const handleOpenPasswordChange = () =>
    setIsPasswordChangeShow(!isPasswordChangeShow);

  const isDark = theme === "dark";

  return (
    <SettingsPageComponent
      isDark={isDark}
      handleReset={handleReset}
      handleChangeTheme={handleChangeTheme}
      handleChangeLanguage={handleChangeLanguage}
      isPasswordChangeShow={isPasswordChangeShow}
      handleOpenPasswordChange={handleOpenPasswordChange}
      {...props}
    />
  );
};

export default SettingsPageContainer;
