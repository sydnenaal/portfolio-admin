import React, { useState } from "react";
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

  const handlers = {
    handleChangeLogin: (e) => setLogin(e.target.value),
    handleChangePassword: (e) => setPassword(e.target.value),
    handleLogin: () => {
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
