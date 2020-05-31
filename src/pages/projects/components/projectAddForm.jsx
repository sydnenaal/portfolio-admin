import React from "react";
import { Input } from "semantic-ui-react";

const AddProjectForm = () => {
  return (
    <div className="projectAddForm">
      <div className="ProjectFormField">
        <Input fluid placeholder="Название" />
      </div>
      <div className="ProjectFormField">
        <Input fluid placeholder="Тип проекта" />
      </div>
      <div className="ProjectFormField">
        <Input fluid placeholder="Клиент" />
      </div>
      <div className="ProjectFormField">
        <Input fluid placeholder="Дата создания" />
      </div>
    </div>
  );
};

export default AddProjectForm;
