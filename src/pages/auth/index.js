import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import AuthComponent from "./component";

const AuthPageContainer = (props) => {
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
        NotificationManager.error("Неверный логин или пароль", "Ошибка");
      }
    },
  };

  return (
    <AuthComponent
      handleChangeLogin={handlers.handleChangeLogin}
      handleChangePassword={handlers.handleChangePassword}
      handleLogin={handlers.handleLogin}
      {...props}
    />
  );
};

export default AuthPageContainer;
