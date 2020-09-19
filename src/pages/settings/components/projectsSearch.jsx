import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown } from "semantic-ui-react";

import { projectsOptions } from "constants/settingsConstants";
import { selectProjectSearch } from "selectors";
import { setLanguage } from "ducks";
import "../style.sass";

function ProjectsSearch() {
  const searchFor = useSelector(selectProjectSearch);
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
          options={projectsOptions}
          value={searchFor}
          onChange={handleChangeSearch}
          simple
          item
        />
      </Menu>
    </div>
  );
}

export default ProjectsSearch;
