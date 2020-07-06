import React, { useState, useCallback, useMemo, memo } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon, Checkbox } from "semantic-ui-react";

import Card from "containers/card";

import { setActiveMessage } from "ducks";
import { dateParse } from "utils";
import { setActualityMessages, setPriorityMessages } from "api";

import "../style.sass";
import { useEffect } from "react";

const calcDelay = (id) => ((id + 1) / 2) * 100;

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
  const [render, setRender] = useState(false);

  const handleChange = useCallback(() => handleCheck(id), [id, handleCheck]);
  const handleContextMenu = useCallback((e) => e.preventDefault(), []);
  const handleMouseLeave = useCallback(() => isOpen && setIsOpen(false), [
    isOpen,
  ]);
  const handleSetPriority = useCallback(() => {
    const data = { messages: [_id], action: !isImportant };
    setIsOpen(false);
    dispatch(setPriorityMessages({ data }));
  }, [_id, isImportant, dispatch]);
  const handleDeleteMessage = useCallback(() => {
    const data = { messages: [_id], action: true };
    setIsOpen(false);
    dispatch(setActualityMessages({ data }));
  }, [_id, dispatch]);
  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      e.button === 2 && setIsOpen(!isOpen);
    },
    [isOpen]
  );
  const handleClick = useCallback(() => {
    const activeMessage = { title, text, client, date };
    dispatch(setActiveMessage(activeMessage));
    history.push(`mail/${_id}`);
  }, [_id, title, text, client, date, dispatch, history]);

  const iconName = useMemo(
    () => (isRead ? "envelope open outline" : "envelope outline"),
    [isRead]
  );
  const messageComponentStyles = useMemo(
    () => clsx({ messageComponent: true, openMessageSubmenu: isOpen }),
    [isOpen]
  );

  useEffect(() => {
    setTimeout(() => setRender(true), calcDelay(id));
  }, [id]);

  return (
    <>
      {render && (
        <div className="messageComponent-hover" onMouseLeave={handleMouseLeave}>
          <div className={messageComponentStyles}>
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
      )}
    </>
  );
};

export default memo(Message);
