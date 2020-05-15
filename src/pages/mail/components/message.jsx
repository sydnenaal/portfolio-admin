import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon, Checkbox } from "semantic-ui-react";

import Card from "../../../containers/card";

import { setActiveMessage } from "../../../redux/actions";
import { dateParse } from "../../../utils";

import "../style.sass";

const Message = ({
  setActiveMessage,
  title,
  text,
  isRead,
  isImportant,
  handleCheck,
  id,
  isChecked,
  client,
  date,
}) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const iconName = isRead ? "envelope open outline" : "envelope outline";

  const style = {
    paddingLeft: isOpen ? "100px" : "5px",
  };

  const handlers = {
    handleChange: () => handleCheck(id),
    handleContextMenu: (e) => e.preventDefault(),
    handleMouseLeave: () => isOpen && setIsOpen(false),
    handleMouseDown: (e) => {
      e.preventDefault();
      e.button === 2 && setIsOpen(!isOpen);
    },
    handleClick: () => {
      setActiveMessage({
        title: title,
        text: text,
        client: client,
        date: date,
      });
      history.push(`mail/${id}`);
    },
  };

  return (
    <div
      className="messageComponent"
      onMouseLeave={handlers.handleMouseLeave}
      style={style}>
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

                  <div className="date">{dateParse(date)}</div>
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

const mapDispatchToProps = {
  setActiveMessage: setActiveMessage,
};

export default connect(null, mapDispatchToProps)(React.memo(Message));
