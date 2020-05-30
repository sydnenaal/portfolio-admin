import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { store } from "react-notifications-component";

import { notificationSettings } from "constants";

import AuthComponent from "./component";

const AuthPageContainer = () => {
  const history = useHistory();
  const { from } = useLocation().state || { from: { pathname: "/" } };

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handlers = {
    handleChangeLogin: (e) => setLogin(e.target.value),
    handleChangePassword: (e) => setPassword(e.target.value),
    handleLogin: () => {
      if (login === "Admin" && password === "1") {
        localStorage.setItem("isAuth", true);
        history.replace(from);
      } else {
        store.addNotification({
          ...notificationSettings,
          title: "Ошибка",
          message: "Неверный логин или пароль",
          type: "danger",
        });
      }
    },
  };

  return (
    <AuthComponent
      handleChangeLogin={handlers.handleChangeLogin}
      handleChangePassword={handlers.handleChangePassword}
      handleLogin={handlers.handleLogin}
    />
  );
};

export default AuthPageContainer;
