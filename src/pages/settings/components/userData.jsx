import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";
import { setContactData } from "api";
import { selectContacts } from "selectors";

const UserData = ({ locale }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [isUserDataChangeShow, setIsUserDataChangeShow] = useState(false);
  const [behance, setBehance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    if (contacts) {
      setBehance(contacts.behance);
      setInstagram(contacts.instagram);
      setFacebook(contacts.facebook);
    }
  }, [contacts]);

  const handleSubmit = () => {
    const fetchData = {
      title: "setContacts",
      data: { behance, instagram, facebook },
    };
    dispatch(setContactData(fetchData));
  };
  const handleOpenPasswordChange = useCallback(
    () => setIsUserDataChangeShow(!isUserDataChangeShow),
    [isUserDataChangeShow]
  );
  const handleChangeBehance = (e) => setBehance(e.target.value);
  const handleChangeInstagram = (e) => setInstagram(e.target.value);
  const handleChangeFacebook = (e) => setFacebook(e.target.value);

  const contentStyle = { maxHeight: `${isUserDataChangeShow ? 300 : 0}px` };
  const chevronStyle = {
    transform: `rotate(${isUserDataChangeShow ? 180 : 0}deg)`,
  };

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
