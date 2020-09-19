import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { checkAuth } from "api/auth";
import AuthComponent from "./component";

const AuthPageContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = { pathname: location.state.from.pathname || "" };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeLogin(e) {
    setLogin(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogin() {
    const params = {
      cancelToken: null,
      title: "auth",
      from: from,
      history: history,
      loginData: { login, password },
    };

    dispatch(checkAuth(params));
  }

  return (
    <AuthComponent
      handleChangeLogin={handleChangeLogin}
      handleChangePassword={handleChangePassword}
      handleLogin={handleLogin}
    />
  );
};

export default AuthPageContainer;
