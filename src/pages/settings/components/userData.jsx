import React, { useCallback, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Input, Button } from "semantic-ui-react";

import "../style.sass";
import { setContactData } from "api";
import { useRequest, useSettingsExpander } from "hooks";
import { selectContacts } from "selectors";

const initialState = {
  behance: "",
  facebook: "",
  instagram: "",
};

function reducer(state, action) {
  const { type, payload } = action;
  const validTypes = ["behance", "facebook", "instagram"];

  if (type === "clear") {
    return initialState;
  }

  if (type === "all") {
    return { ...payload };
  }

  if (type in validTypes) {
    return { ...state, [type]: payload };
  }

  return state;
}

const UserData = ({ locale }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [state, localDispatch] = useReducer(reducer, initialState);
  const requestWrapper = useRequest();
  const { behance, facebook, instagram } = state;
  const {
    contentStyle,
    chevronStyle,
    handleToggleExpander,
  } = useSettingsExpander();

  useEffect(() => {
    if (contacts) {
      localDispatch({ type: "all", payload: contacts });
    }
  }, [contacts]);

  function handleSubmit() {
    const data = { behance, instagram, facebook };
    const params = { ...setContactData, title: "setContacts", body: { data } };

    dispatch(requestWrapper(params));
    localDispatch({ type: "clear" });
  }

  const handleChange = useCallback((e) => {
    const { type } = this;

    localDispatch({ type, payload: e.target.value });
  }, []);

  return (
    <div>
      <div className="passwordChangeHeader" onClick={handleToggleExpander}>
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
              onChange={handleChange.bind({ type: "behance" })}
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
              onChange={handleChange.bind({ type: "instagram" })}
              value={instagram}
              placeholder="Instagram"
            />
          </div>

          <div className="passwordChange-input">
            <Input
              size="small"
              fluid
              onChange={handleChange.bind({ type: "facebook" })}
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
