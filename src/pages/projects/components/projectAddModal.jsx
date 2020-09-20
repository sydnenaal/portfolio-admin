import React, { useCallback, memo, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Input } from "semantic-ui-react";

import { insertProjects } from "api";
import { dateParse } from "utils";
import { setProjects } from "ducks";
import Modal from "containers/modal";
import { useRequest } from "hooks";

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
  const requestWrapper = useRequest();
  const [state, localDispatch] = useReducer(formReducer, initialState);
  const { name, type, client } = state;

  const handleChange = useCallback(function (e) {
    const { type } = this;

    localDispatch({ type, payload: e.target.value });
  }, []);

  const handleSuccess = useCallback(() => {
    const data = { ...state, createDate: Date.now() };
    const params = {
      ...insertProjects,
      title: "insertProject",
      body: { data },
    };

    function handleSuccessRequest(response) {
      const { data } = response;
      const responseWithChecked = data.map((item) => ({
        ...item,
        isChecked: false,
        createDate: dateParse(item.createDate),
      }));

      dispatch(setProjects(responseWithChecked));
    }

    dispatch(requestWrapper(params, handleSuccessRequest));
    localDispatch({ type: "clear" });
    handleToggleModal();
  }, [dispatch, localDispatch, handleToggleModal, requestWrapper, state]);

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
