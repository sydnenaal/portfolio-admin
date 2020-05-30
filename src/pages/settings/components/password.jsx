import React, { useState } from "react";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";

const ChangePassword = ({ locale }) => {
  const [isPasswordChangeShow, setIsPasswordChangeShow] = useState(false);

  const handleOpenPasswordChange = () =>
    setIsPasswordChangeShow(!isPasswordChangeShow);

  const contentStyle = {
    maxHeight: `${isPasswordChangeShow ? 300 : 0}px`,
  };

  const chevronStyle = {
    transform: `rotate(${isPasswordChangeShow ? 180 : 0}deg)`,
  };

  return (
    <div>
      <div className="passwordChangeHeader" onClick={handleOpenPasswordChange}>
        <p>{locale.settings.password}</p>

        <div className="chevronIcon" style={chevronStyle}>
          <Icon name="chevron down"></Icon>
        </div>
      </div>

      <div className="passwordChange" style={contentStyle}>
        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            placeholder={locale.settings.enterPasswordPlaceholder}
          />
        </div>

        <div className="passwordChange-input">
          <Input
            size="small"
            fluid
            placeholder={locale.settings.repeatPasswordPlaceholder}
          />
        </div>

        <div className="passwordChange-button">
          <Button>{locale.settings.savePassword}</Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
