import React from "react";
import { Modal, Button } from "semantic-ui-react";

function ModalWindow({
  handleClose,
  isOpen,
  title,
  children,
  handleSuccess,
  size,
}) {
  return (
    <>
      <Modal open={isOpen} onClose={handleClose} size={size}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>{children}</Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSuccess}>Подтвердить</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalWindow;
