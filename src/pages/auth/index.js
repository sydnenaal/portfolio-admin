import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import AuthComponent from "./component";

const AuthPageContainer = props => {
  const [login, setLogin] = React.useState("");

  const [password, setPassword] = React.useState("");

  const history = useHistory();

  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleChangeLogin = e => setLogin(e.target.value);

  const handleChangePassword = e => setPassword(e.target.value);

  let handleLogin = () => {
    if (login === "Admin" && password === "1") {
      localStorage.setItem("isAuth", true);
      history.replace(from);
    } else {
      NotificationManager.error("Неверный логин или пароль", "Ошибка");
    }
  };

  return (
    <AuthComponent
      handleChangeLogin={handleChangeLogin}
      handleChangePassword={handleChangePassword}
      handleLogin={handleLogin}
      {...props}
    />
  );
};

export default AuthPageContainer;
