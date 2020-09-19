import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Input, Button } from "semantic-ui-react";
import { useHistory, useLocation } from "react-router-dom";

import "./style.sass";
import { selectRequestStack } from "selectors";
import { checkAuth } from "api/auth";
import { useRequest } from "hooks";

function AuthPageComponent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const requestStack = useSelector(selectRequestStack);
  const requestWrapper = useRequest();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useMemo(() => requestStack.indexOf("auth") !== -1, [
    requestStack,
  ]);
  const from = useMemo(
    () => ({ pathname: location.state.from.pathname || "" }),
    [location]
  );

  const handleChangeLogin = useCallback((e) => {
    setLogin(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  });

  function handleLogin() {
    const data = encryptData(JSON.stringify({ login, password }));
    const params = { ...checkAuth, title: "auth", body: { data } };

    function onSuccess(response) {
      const { data } = response;

      dispatch(setUserData(data));
      localStorage.setItem("token", response.data.token);
      history.replace(from);
    }

    dispatch(requestWrapper(params, onSuccess));
  }

  return (
    <div className="auth">
      <div className="cardBody">
        <Card fluid>
          <Card.Content>
            <div className="cardContent">
              <div className="cardContent_title">
                <p>Авторизация</p>
              </div>

              <div className="cardContent_input">
                <Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="login"
                  type="login"
                  onChange={handleChangeLogin}
                />
              </div>

              <div className="cardContent_input">
                <Input
                  fluid
                  icon="key"
                  iconPosition="left"
                  placeholder="password"
                  type="password"
                  onChange={handleChangePassword}
                />
              </div>

              <div className="cardContent_button">
                <Button loading={isLoading} onClick={handleLogin} primary>
                  Вход
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default AuthPageComponent;
