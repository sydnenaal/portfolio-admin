import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ProjectSavePageComponent from "./component";

const ProjectSavePageContainer = () => {
  const history = useHistory();

  const [isTextModalShow, setIsTextModalShow] = useState(false);
  const [isPictureModalShow, setIsPictureModalShow] = useState(false);

  const onBack = () => history.goBack();

  const handleToggleTextModal = () => setIsTextModalShow(!isTextModalShow);
  const handleTogglePictureModal = () =>
    setIsPictureModalShow(!isPictureModalShow);

  return (
    <ProjectSavePageComponent
      isTextModalShow={isTextModalShow}
      isPictureModalShow={isPictureModalShow}
      onBack={onBack}
      handleToggleTextModal={handleToggleTextModal}
      handleTogglePictureModal={handleTogglePictureModal}
    />
  );
};

export default ProjectSavePageContainer;
