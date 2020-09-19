import React, { useState, useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";

import PageWithHeader from "containers/pageWithHeader";
import Modal from "containers/modal";
import AddPictureForm from "./components/addPictureForm";
import AddTextForm from "./components/addTextForm";
import Card from "containers/card";

function ProjectSavePageComponent() {
  const {
    messages: { titles },
  } = useIntl();

  const history = useHistory();
  const [isTextModalShow, setIsTextModalShow] = useState(false);
  const [isPictureModalShow, setIsPictureModalShow] = useState(false);

  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleToggleTextModal = useCallback(() => {
    setIsTextModalShow((curState) => !curState);
  }, []);

  const handleTogglePictureModal = useCallback(() => {
    setIsPictureModalShow((curState) => !curState);
  }, []);

  return (
    <PageWithHeader title={titles.projects} subtitle={"read"}>
      <div className="projectsSaveBody">
        <div className="projectsSaveActions">
          <Button onClick={handleClickBack}>Назад</Button>
          <Button onClick={handleTogglePictureModal}>Добавить картинку</Button>
          <Button onClick={handleToggleTextModal}>Добавить текст</Button>
        </div>
        <Card>
          <div className="projectContent">empty</div>
        </Card>
      </div>
      <Modal
        title="Добавить текст"
        isOpen={isTextModalShow}
        handleClose={handleToggleTextModal}
      >
        <AddTextForm />
      </Modal>
      <Modal
        title="Добавить картинку"
        isOpen={isPictureModalShow}
        handleClose={handleTogglePictureModal}
      >
        <AddPictureForm />
      </Modal>
    </PageWithHeader>
  );
}

export default ProjectSavePageComponent;
