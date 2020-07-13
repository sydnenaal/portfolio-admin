import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";
import { setContactData } from "api";

const UserData = ({ locale }) => {
  const dispatch = useDispatch();

  const [isUserDataChangeShow, setIsUserDataChangeShow] = useState(false);
  const [behance, setBehance] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  const handleSubmit = () => {
    dispatch(
      setContactData({
        title: "setContacts",
        data: {
          behance,
          instagram,
          facebook,
        },
      })
    );
  };
  const handleOpenPasswordChange = useCallback(
    () => setIsUserDataChangeShow(!isUserDataChangeShow),
    [isUserDataChangeShow]
  );
  const handleChangeBehance = (e) => setBehance(e.target.value);
  const handleChangeInstagram = (e) => setInstagram(e.target.value);
  const handleChangeFacebook = (e) => setFacebook(e.target.value);

  const contentStyle = useMemo(
    () => ({
      maxHeight: `${isUserDataChangeShow ? 300 : 0}px`,
    }),
    [isUserDataChangeShow]
  );
  const chevronStyle = useMemo(
    () => ({
      transform: `rotate(${isUserDataChangeShow ? 180 : 0}deg)`,
    }),
    [isUserDataChangeShow]
  );

  return (
    <div>
      <div className="passwordChangeHeader" onClick={handleOpenPasswordChange}>
        <p>{locale.settings.userData}</p>
        <div className="chevronIcon" style={chevronStyle}>
          <Icon name="chevron down" />
        </div>
      </div>
      <div>
        <div className="passwordChange" style={contentStyle}>
          <div className="passwordChange-input">
            <Input
              size="small"
              fluid
              onChange={handleChangeBehance}
              value={behance}
              placeholder="Behance"
            />
          </div>
        </div>
        <div className="passwordChange" style={contentStyle}>
          <div className="passwordChange-input">
            <Input
              size="small"
              fluid
              onChange={handleChangeInstagram}
              value={instagram}
              placeholder="Instagram"
            />
          </div>

          <div className="passwordChange-input">
            <Input
              size="small"
              fluid
              onChange={handleChangeFacebook}
              value={facebook}
              placeholder="Facebook"
            />
          </div>

          <div className="passwordChange-button">
            <Button onClick={handleSubmit}>
              {locale.settings.savePassword}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
