import React from "react";
import { useIntl } from "react-intl";

import "./style.sass";

import PageWithHeader from "containers/pageWithHeader";

const ProjectSavePageComponent = () => {
  const {
    messages: { titles },
  } = useIntl();

  return (
    <PageWithHeader title={titles.projects} subtitle={"read"}>
      <div className="mainBody"></div>
    </PageWithHeader>
  );
};

export default ProjectSavePageComponent;
