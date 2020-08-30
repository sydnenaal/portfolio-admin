import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "semantic-ui-react";

import { messagesOptions } from "constants/settingsConstants";
import { selectMessagesSearch } from "selectors";
import "../style.sass";
import { setLanguage } from "ducks";

const MessagesSearch = () => {
  const searchFor = useSelector(selectMessagesSearch);
  const dispatch = useDispatch();

  const handleChangeSearch = useCallback(
    (e, data) => {
      const { value } = data;
      dispatch(setLanguage(value));
      localStorage.setItem("lang", value);
    },
    [dispatch]
  );

  return (
    <div id="language">
      <p>Критерий поиска</p>
      <Menu compact>
        <Dropdown
          options={messagesOptions}
          value={searchFor}
          onChange={handleChangeSearch}
          simple
          item
        />
      </Menu>
    </div>
  );
};

export default MessagesSearch;
