import React, { useState } from "react";
import _ from "lodash";

import ProjectsPageComponent from "./component";

const ProjectsPageContainer = (props) => {
  const [compact, changeCompact] = useState(false);
  const [filter, setFilter] = useState("");

  const handlers = {
    handleChange: () => changeCompact(!compact),
    handleChangeFilter: ({ target: { value } }) => setFilter(value),
    handleFilterData: (data) =>
      data.filter((item) => {
        let isValid = false;

        const search = (value) => {
          if (
            value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1
          ) {
            isValid = true;
          }
        };

        _.forEach(item, search);

        return isValid;
      }),
  };

  return (
    <ProjectsPageComponent
      compact={compact}
      handleChangeFilter={handlers.handleChangeFilter}
      handleChange={handlers.handleChange}
      handleFilterData={handlers.handleFilterData}
      {...props}
    />
  );
};

export default ProjectsPageContainer;
