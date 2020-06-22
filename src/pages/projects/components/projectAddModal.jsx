import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";

import { insertProjects } from "ducks";

import Modal from "containers/modal";

const AddProjectForm = ({ modalState, handleToggleModal }) => {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeType = (e) => setType(e.target.value);
  const handleChangeClient = (e) => setClient(e.target.value);

  const handleSuccess = () => {
    const data = {
      name,
      type,
      client,
      createDate: Date.now(),
    };

    dispatch(
      insertProjects({
        cancelToken: source.token,
        title: "insertProject",
        body: { data: data },
      })
    );

    setName("");
    setType("");
    setClient("");
    handleToggleModal();
  };

  return (
    <Modal
      isOpen={modalState}
      handleClose={handleToggleModal}
      size="tiny"
      title="Добавление проекта"
      handleSuccess={handleSuccess}
    >
      <div className="projectAddForm">
        <div className="ProjectFormField">
          <Input
            fluid
            placeholder="Название"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="ProjectFormField">
          <Input
            fluid
            placeholder="Тип проекта"
            value={type}
            onChange={handleChangeType}
          />
        </div>
        <div className="ProjectFormField">
          <Input
            fluid
            placeholder="Клиент"
            value={client}
            onChange={handleChangeClient}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddProjectForm;
