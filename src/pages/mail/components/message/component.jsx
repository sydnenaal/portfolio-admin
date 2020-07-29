import React, { memo } from "react";
import { Icon, Checkbox } from "semantic-ui-react";

import Card from "containers/card";
import { dateParse } from "utils";

import "./style.sass";
import AdaptiveContainer from "./adaptiveContainer";

const Message = ({
  handleSetPriority,
  isOpen,
  setIsOpen,
  isRead,
  isImportant,
  isChecked,
  handleCheckMessage,
  handleClickOnMessage,
  client,
  handleDeleteOnAnimationEnd,
  date,
  handleDeleteMessage,
  render,
  deleteAnimationTrigger,
  text,
}) => {
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
