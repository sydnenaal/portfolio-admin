import React, { useState, useRef } from "react";
import { Button } from "semantic-ui-react";

const inputStyle = { display: "none" };

const AddPictureForm = () => {
  const [uploadedImage, setUploadedImage] = useState();
  const inputRef = useRef();

  const handleClick = () => inputRef.current.click();
  const handleChangeInput = (e) => setUploadedImage(e.target.value);

  return (
    <div className="form-text">
      <div className="form-text_title">{uploadedImage || "Выберите файл"}</div>
      <Button onClick={handleClick}>Выбрать файл</Button>

      <input
        type="file"
        style={inputStyle}
        ref={inputRef}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default AddPictureForm;
