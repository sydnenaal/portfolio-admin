import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "semantic-ui-react";

import { languageOptions } from "constants/settingsConstants";
import { selectLanguage } from "selectors";
import "../style.sass";
import { setLanguage } from "ducks";

function Language({ locale }) {
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const handleChangeLanguage = useCallback(
    (_, data) => {
      const { value } = data;

      dispatch(setLanguage(value));
      localStorage.setItem("lang", value);
    },
    [dispatch]
  );

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
}

export default Language;
