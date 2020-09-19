import React, { useState, useRef, useCallback, memo } from "react";
import { Button } from "semantic-ui-react";

const inputStyle = { display: "none" };

function AddPictureForm() {
  const [uploadedImage, setUploadedImage] = useState();
  const inputRef = useRef();

  const handleClick = useCallback(() => {
    inputRef.current.click();
  }, [inputRef]);

  const handleChangeInput = useCallback((e) => {
    setUploadedImage(e.target.value);
  }, []);

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
}

export default memo(AddPictureForm);
