import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon, Checkbox } from "semantic-ui-react";

import Card from "containers/card";

import { setActiveMessage } from "redux/actions";
import { dateParse } from "utils";
import { setActualityMessages, setPriorityMessages } from "ducks";

import "../style.sass";

const Message = ({
  title,
  text,
  isRead,
  isImportant,
  handleCheck,
  id,
  _id,
  isChecked,
  client,
  date,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState({});

  const iconName = isRead ? "envelope open outline" : "envelope outline";

  const handleChange = () => handleCheck(id);
  const handleContextMenu = (e) => e.preventDefault();
  const handleMouseLeave = () => isOpen && setIsOpen(false);
  const handleSetPriority = () => {
    dispatch(
      setPriorityMessages({
        data: { messages: [_id], action: !isImportant },
      })
    );
  };
  const handleDeleteMessage = () => {
    dispatch(
      setActualityMessages({
        data: { messages: [_id], action: true },
      })
    );
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.button === 2 && setIsOpen(!isOpen);
  };
  const handleClick = () => {
    dispatch(
      setActiveMessage({
        title: title,
        text: text,
        client: client,
        date: date,
      })
    );
    history.push(`mail/${_id}`);
  };

  const messageContainerPadding = { paddingLeft: isOpen ? "100px" : "0px" };

  useEffect(() => {
    const calcDelay = () => {
      const delay = id * 2;
      if (delay < 10) {
        return "0" + delay;
      }
      return delay;
    };

    const style = {
      transitionDelay: `0.${calcDelay()}s`,
      opacity: 1,
    };

    setTimeout(() => setStyle(style), 0);
  }, [id]);

  return (
    <div className="messageComponent-hover" onMouseLeave={handleMouseLeave}>
      <div
        className="messageComponent"
        style={{ ...style, ...messageContainerPadding }}
      >
        <div className="deleteMessage">
          <div className="actionIcon">
            <Icon
              onClick={handleDeleteMessage}
              size="big"
              name="trash alternate"
            />
          </div>

          <div className="actionIcon">
            <Icon onClick={handleSetPriority} size="big" name="warning" />
          </div>
        </div>

        <div className="messageContainer">
          <Card>
            <div
              className="messageContent"
              onContextMenu={handleContextMenu}
              onMouseDown={handleMouseDown}
            >
              <div className="indicator">
                {!isRead && <div className="readPoint"></div>}

                {isImportant && <div className="importantPoint"></div>}
              </div>

              <div className="checkboxContainer">
                <div className="checkbox">
                  <Checkbox checked={isChecked} onChange={handleChange} />
                </div>
              </div>

              <div className="redirect" onClick={handleClick}>
                <div className="image">
                  <Icon size="huge" name={iconName}></Icon>
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
    </div>
  );
};

export default memo(Message);
