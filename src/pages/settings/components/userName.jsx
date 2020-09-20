import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";
import { setUserName } from "api";
import { useSettingsExpander, useRequest } from "hooks";

function ChangePassword({ locale }) {
  const dispatch = useDispatch();
  const queryWrapper = useRequest();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const {
    contentStyle,
    chevronStyle,
    handleToggleExpander,
  } = useSettingsExpander();

  const handleChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleChangeSurname = useCallback((e) => {
    setSurname(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    const data = { username: `${name} ${surname}` };
    const fetchData = {
      ...setUserName,
      title: "changeUsername",
      body: { data },
    };

    dispatch(queryWrapper(fetchData));
    setName("");
    setSurname("");
    handleToggleExpander();
  }, [name, surname, dispatch]);

  return (
    <div>
      <div className="passwordChangeHeader" onClick={handleToggleExpander}>
        <p>Сменить имя пользователя</p>

        <div className="chevronIcon" style={chevronStyle}>
          <Icon name="chevron down"></Icon>
        </div>
      </div>

      <div className="passwordChange" style={contentStyle}>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            onChange={handleChangeName}
            value={name}
            placeholder="Введите имя"
          />
        </div>
      </div>

      <div className="passwordChange" style={contentStyle}>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            onChange={handleChangeSurname}
            value={surname}
            placeholder="Введите фамилию"
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
