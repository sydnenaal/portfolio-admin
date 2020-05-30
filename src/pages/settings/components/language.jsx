import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "semantic-ui-react";

import { languageOptions } from "constants/settingsConstants";
import { selectLanguage } from "redux/selectors";

import "../style.sass";
import { setLanguage } from "redux/actions";

const Language = ({ locale }) => {
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const handleChangeLanguage = (e, data) => {
    const { value } = data;
    dispatch(setLanguage(value));
    localStorage.setItem("lang", value);
  };

  return (
    <div id="language">
      <p>{locale.settings.language}</p>
      <Menu compact>
        <Dropdown
          options={languageOptions}
          value={language}
          onChange={handleChangeLanguage}
          simple
          item
        />
      </Menu>
    </div>
  );
};

export default Language;
