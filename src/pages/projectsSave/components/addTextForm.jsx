import React, { memo } from "react";
import { Form, TextArea } from "semantic-ui-react";

function AddTextForm() {
  return (
    <div className="form_textArea">
      <Form>
        <TextArea placeholder="Введите текст" />
      </Form>
    </div>
  );
}

export default memo(AddTextForm);
