import React, { useMemo, useCallback, memo, useReducer } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";

import { insertProjects } from "api";

import Modal from "containers/modal";
import { useEffect } from "react";

const initialState = {
  name: "",
  type: "",
  client: "",
};

function formReducer(state, action) {
  const { type, payload } = action;
  const validTypes = ["name", "type", "client"];

  if (type === "clear") {
    return initialState;
  }

  if (type in validTypes) {
    return { ...state, [type]: payload };
  }

  return state;
}

function AddProjectForm({ modalState, handleToggleModal }) {
  const dispatch = useDispatch();
  const { token: cancelToken, cancel } = useMemo(axios.CancelToken.source, []);
  const [state, localDispatch] = useReducer(formReducer, initialState);
  const { name, type, client } = state;

  useEffect(() => cancel, []);

  const handleChange = useCallback(function (e) {
    const { type } = this;

    localDispatch({ type, payload: e.target.value });
  }, []);

  const handleSuccess = useCallback(() => {
    const data = { ...state, createDate: Date.now() };
    const requestData = {
      cancelToken,
      title: "insertProject",
      body: { data },
    };

    dispatch(insertProjects(requestData));
    localDispatch({ type: "clear" });
    handleToggleModal();
  }, [dispatch, localDispatch, handleToggleModal, cancelToken]);

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
            onChange={handleChange.bind({ type: "name" })}
          />
        </div>
        <div className="ProjectFormField">
          <Input
            fluid
            placeholder="Тип проекта"
            value={type}
            onChange={handleChange.bind({ type: "type" })}
          />
        </div>
        <div className="ProjectFormField">
          <Input
            fluid
            placeholder="Клиент"
            value={client}
            onChange={handleChange.bind({ type: "client" })}
          />
        </div>
      </div>
    </Modal>
  );
}

export default memo(AddProjectForm);
