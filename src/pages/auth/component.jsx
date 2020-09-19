import React from "react";
import { useSelector } from "react-redux";
import { Card, Input, Button } from "semantic-ui-react";

import "./style.sass";
import { selectRequestStack } from "selectors";

function AuthPageComponent({
  handleChangeLogin,
  handleChangePassword,
  handleLogin,
}) {
  const requestStack = useSelector(selectRequestStack);
  const isLoading = requestStack.indexOf("auth") !== -1;

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
