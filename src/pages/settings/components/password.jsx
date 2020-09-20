import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";
import { encryptData } from "utils";
import { changePassword } from "api";
import { useSettingsExpander, useRequest } from "hooks";

const initialState = {
  oldPassword: "",
  password: "",
  repeatPassword: "",
};

function reducer(state, action) {
  const { type, payload } = action;
  const validTypes = ["oldPassword", "password", "repeatPassword"];

  if (type === "clear") {
    return initialState;
  }

  if (type in validTypes) {
    return { ...state, [type]: payload };
  }

  return state;
}

function ChangePassword({ locale }) {
  const dispatch = useDispatch();
  const queryWrapper = useRequest();
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { oldPassword, password, repeatPassword } = state;
  const [error, setError] = useState(false);
  const {
    contentStyle,
    chevronStyle,
    handleToggleExpander,
  } = useSettingsExpander();

  const handleChange = useCallback((e) => {
    const { type } = this;

    setError((error) => {
      if (error) {
        return false;
      }

      return error;
    });

    localDispatch({ type, payload: e.target.value });
  }, []);

  const handleSubmit = useCallback(() => {
    if (password !== repeatPassword) {
      setError(true);
      return;
    }

    const data = {
      password: encryptData(password),
      oldPassword: encryptData(oldPassword),
    };
    const params = {
      ...changePassword,
      title: "changePassword",
      body: { data },
    };

    dispatch(queryWrapper(params));
    localDispatch({ type: "clear" });
    handleToggleExpander();
  }, [password, oldPassword, dispatch]);

  return (
    <div>
      <div className="passwordChangeHeader" onClick={handleToggleExpander}>
        <p>{locale.settings.password}</p>
        <div className="chevronIcon" style={chevronStyle}>
          <Icon name="chevron down"></Icon>
        </div>
      </div>
      <div className="passwordChange" style={contentStyle}>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            type="password"
            onChange={handleChange.bind({ type: "oldPassword" })}
            value={oldPassword}
            placeholder={locale.settings.enterOldPasswordPlaceholder}
          />
        </div>
      </div>
      <div className="passwordChange" style={contentStyle}>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            type="password"
            onChange={handleChange.bind({ type: "password" })}
            value={password}
            placeholder={locale.settings.enterPasswordPlaceholder}
          />
        </div>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            type="password"
            error={error}
            onChange={handleChange.bind({ type: "repeatPassword" })}
            value={repeatPassword}
            placeholder={locale.settings.repeatPasswordPlaceholder}
          />
        </div>
        <div className="passwordChange-button">
          <Button onClick={handleSubmit}>{locale.settings.savePassword}</Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
