import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { checkAuth } from "api/auth";

import AuthComponent from "./component";

const AuthPageContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { from } = useLocation().state || { from: { pathname: "/" } };

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLogin = useCallback((e) => setLogin(e.target.value), []);
  const handleChangePassword = useCallback(
    (e) => setPassword(e.target.value),
    []
  );
  const handleLogin = useCallback(() => {
    dispatch(
      checkAuth({
        cancelToken: null,
        title: "auth",
        from: from,
        history: history,
        loginData: {
          login,
          password,
        },
      })
    );
  }, [history, dispatch, from, login, password]);

  return (
    <AuthComponent
      handleChangeLogin={handleChangeLogin}
      handleChangePassword={handleChangePassword}
      handleLogin={handleLogin}
    />
  );
};

export default AuthPageContainer;
