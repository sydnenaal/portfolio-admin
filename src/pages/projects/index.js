import React, { useState } from "react";

import ProjectsPageComponent from "./component";

const ProjectsPageContainer = (props) => {
  const [compact, changeCompact] = useState(false);

  const handleChange = () => changeCompact(!compact);

  return (
    <ProjectsPageComponent
      compact={compact}
      handleChange={handleChange}
      {...props}
    />
  );
};

export default ProjectsPageContainer;
