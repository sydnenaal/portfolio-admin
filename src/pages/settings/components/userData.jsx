import React from "react";
import { Icon } from "semantic-ui-react";

import "../style.sass";

const UserData = ({ locale }) => {
  return (
    <div>
      <div className="passwordChangeHeader">
        <p>{locale.settings.userData}</p>
        <div className="chevronIcon">
          <Icon name="chevron down"></Icon>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default UserData;
