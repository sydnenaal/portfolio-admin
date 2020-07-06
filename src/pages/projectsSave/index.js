import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import ProjectSavePageComponent from "./component";

const ProjectSavePageContainer = () => {
  const history = useHistory();

  const [isTextModalShow, setIsTextModalShow] = useState(false);
  const [isPictureModalShow, setIsPictureModalShow] = useState(false);

  const onBack = useCallback(() => history.goBack(), [history]);

  const handleToggleTextModal = useCallback(
    () => setIsTextModalShow(!isTextModalShow),
    [isTextModalShow]
  );
  const handleTogglePictureModal = useCallback(
    () => setIsPictureModalShow(!isPictureModalShow),
    [isPictureModalShow]
  );

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
