import React, { useState } from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

import { setTheme, setLanguage } from "../../redux/actions";

import SettingsPageComponent from "./component";

const SettingsPageContainer = ({ setTheme, setLanguage, theme, ...props }) => {
  const [isPasswordChangeShow, setIsPasswordChangeShow] = useState(false);

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
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

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = {
  setTheme: setTheme,
  setLanguage: setLanguage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPageContainer);
