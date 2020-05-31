import React from "react";
import { Form, TextArea } from "semantic-ui-react";

const AddTextForm = () => {
  return (
    <div className="form_textArea">
      <Form>
        <TextArea placeholder="Введите текст" />
      </Form>
    </div>
  );
};

export default AddTextForm;
