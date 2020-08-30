import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";
import { setUserName } from "api";

const ChangePassword = ({ locale }) => {
  const dispatch = useDispatch();

  const [isUsernameChangeShow, setIsUsernameChangeShow] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleChangeName = useCallback((e) => setName(e.target.value), []);
  const handleChangeSurname = useCallback(
    (e) => setSurname(e.target.value),
    []
  );

  const handleSubmit = useCallback(() => {
    const fetchData = {
      title: "changeUsername",
      username: `${name} ${surname}`,
    };
    dispatch(setUserName(fetchData));
    setName("");
    setSurname("");
    setIsUsernameChangeShow(false);
  }, [name, surname, dispatch]);
  const handleOpenUsernameChange = () =>
    setIsUsernameChangeShow(!isUsernameChangeShow);

  const contentStyle = { maxHeight: `${isUsernameChangeShow ? 300 : 0}px` };
  const chevronStyle = {
    transform: `rotate(${isUsernameChangeShow ? 180 : 0}deg)`,
  };

  return (
    <div>
      <div className="passwordChangeHeader" onClick={handleOpenUsernameChange}>
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
};

export default ChangePassword;
