import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Icon, Checkbox } from "semantic-ui-react";

import Card from "../../../containers/card";
import ThemeContext from "../../../contexts/theme";
import ThemeStyle from "../../../constants/themingStyles";

import "../style.sass";

const Message = ({
  title,
  text,
  isRead,
  isImportant,
  handleCheck,
  id,
  isChecked,
  client,
  date,
  index,
}) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const theme = useContext(ThemeContext);

  const iconName = isRead ? "envelope open outline" : "envelope outline";

  const handlers = {
    handleClick: () => history.push(`mail/${id}`),
    handleDateParse: (date) => moment(date).format("MMM Do YY hh:mm"),
    handleChange: () => handleCheck(id),
    handleContextMenu: (e) => e.preventDefault(),
    handleMouseDown: (e) => {
      e.preventDefault();
      e.button === 2 && setIsOpen(!isOpen);
    },
  };

  return (
    <div
      className="messageComponent"
      style={{
        paddingLeft: isOpen ? "100px" : "5px",
      }}>
      <div className="deleteMessage">
        <div className="actionIcon">
          <Icon size="big" name="trash alternate" />
        </div>

        <div className="actionIcon">
          <Icon size="big" name="warning" />
        </div>
      </div>

      <div className="messageContainer">
        <Card>
          <div
            className="messageContent"
            onContextMenu={handlers.handleContextMenu}
            onMouseDown={handlers.handleMouseDown}>
            <div className="indicator">
              {!isRead && <div className="readPoint"></div>}

              {isImportant && <div className="importantPoint"></div>}
            </div>

            <div className="checkboxContainer">
              <div className="checkbox">
                <Checkbox
                  checked={isChecked}
                  onChange={handlers.handleChange}
                />
              </div>
            </div>

            <div className="redirect" onClick={handlers.handleClick}>
              <div className="image">
                <Icon size="big" name={iconName}></Icon>
              </div>

              <div className="messageInfo">
                <div className="messageMeta">
                  <div className="title">
                    <strong>{client}</strong>
                  </div>

                  <div className="date">{handlers.handleDateParse(date)}</div>
                </div>

                <div className="messageText">
                  <div className="title">
                    <strong>{title}</strong>
                  </div>

                  <div className="text">{text}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(Message);
