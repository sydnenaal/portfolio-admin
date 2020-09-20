import React, { useState, useEffect, useCallback, memo } from "react";
import { Icon, Checkbox } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "containers/card";
import { dateParse } from "utils";
import "./style.sass";
import AdaptiveContainer from "./adaptiveContainer";
import { setActiveMessage } from "ducks";
import { setPriorityMessages, setActualityMessages } from "api";
import { useRequest } from "hooks";

const Message = ({
  _id,
  isImportant,
  isChecked,
  index,
  isRead,
  client,
  email,
  date,
  text,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const queryWrapper = useRequest();
  const [render, setRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAnimationTrigger, setDeleteAnimationTrigger] = useState(false);

  const handleCheckMessage = useCallback(
    (_, data) =>
      dispatch({
        type: data.checked ? "CHECK_SINGLE" : "DROP_SINGLE_CHECK",
        payload: _id,
      }),
    [_id, dispatch]
  );

  const handleSetPriority = useCallback(() => {
    const data = { messages: [_id], action: !isImportant };
    const params = {
      ...setPriorityMessages,
      title: "setPriority",
      body: { data },
    };

    setIsOpen(false);
    dispatch(queryWrapper(params));
  }, [dispatch, _id, isImportant, queryWrapper]);

  const handleDeleteMessage = useCallback(() => {
    setDeleteAnimationTrigger(true);
  }, []);

  const handleClickOnMessage = useCallback(() => {
    const activeMessage = { email, text, client, date };

    dispatch(setActiveMessage(activeMessage));
    history.push(`mail/${_id}`);
  }, [email, text, client, date, _id, dispatch, history]);

  const handleDeleteOnAnimationEnd = useCallback(
    (e) => {
      if (e.animationName === "fadeOut") {
        const data = { messages: [_id], action: true };
        const params = {
          ...setActualityMessages,
          title: "setPriority",
          body: { data },
        };

        setRender(false);
        setIsOpen(false);
        dispatch(queryWrapper(params));
      }
    },
    [_id, dispatch, queryWrapper]
  );

  useEffect(() => {
    const delay = ((index + 1) / 3) * 100;
    setTimeout(() => setRender(true), delay);
  }, [index]);

  return (
    <>
      <div className="messageComponent-hover">
        {render && (
          <AdaptiveContainer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDeleted={deleteAnimationTrigger}
            handleDeleteOnAnimationEnd={handleDeleteOnAnimationEnd}
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
                <div className="messageContent">
                  <div className="indicator">
                    {!isRead && <div className="readPoint"></div>}

                    {isImportant && <div className="importantPoint"></div>}
                  </div>

                  <div className="checkboxContainer">
                    <div className="checkbox">
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckMessage}
                      />
                    </div>
                  </div>

                  <div className="redirect" onClick={handleClickOnMessage}>
                    <div className="image">
                      <Icon
                        size="huge"
                        name={
                          isRead ? "envelope open outline" : "envelope outline"
                        }
                      ></Icon>
                    </div>

                    <div className="messageInfo">
                      <div className="messageMeta">
                        <div className="title">
                          <strong>{client}</strong>
                        </div>

                        <div className="date">{dateParse(date)}</div>
                      </div>

                      <div className="messageText">
                        <div className="text">{text}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </AdaptiveContainer>
        )}
      </div>
    </>
  );
};

export default memo(Message);
