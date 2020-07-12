import React, { memo } from "react";
import { Icon, Checkbox } from "semantic-ui-react";

import Card from "containers/card";
import { dateParse } from "utils";

import "./style.sass";

const Message = ({ ...props }) => {
  return (
    <>
      {props.render && (
        <div
          className="messageComponent-hover"
          onMouseLeave={props.handleMouseLeave}
        >
          <div
            className={props.messageComponentStyles}
            style={props.translateStyle}
          >
            <div className="deleteMessage">
              <div className="actionIcon">
                <Icon
                  onClick={props.handleDeleteMessage}
                  size="big"
                  name="trash alternate"
                />
              </div>

              <div className="actionIcon">
                <Icon
                  onClick={props.handleSetPriority}
                  size="big"
                  name="warning"
                />
              </div>
            </div>

            <div className="messageContainer">
              <Card>
                <div
                  className="messageContent"
                  onContextMenu={props.handlePreventContextMenu}
                  onTouchStart={props.handleTouchStart}
                  onTouchMove={props.handleTouchMove}
                  onTouchEnd={props.handleTouchEnd}
                  onMouseDown={props.handleRightClickOnMessage}
                >
                  <div className="indicator">
                    {!props.isRead && <div className="readPoint"></div>}

                    {props.isImportant && (
                      <div className="importantPoint"></div>
                    )}
                  </div>

                  <div className="checkboxContainer">
                    <div className="checkbox">
                      <Checkbox
                        checked={props.isChecked}
                        onChange={props.handleCheckMessage}
                      />
                    </div>
                  </div>

                  <div
                    className="redirect"
                    onClick={props.handleClickOnMessage}
                  >
                    <div className="image">
                      <Icon size="huge" name={props.iconName}></Icon>
                    </div>

                    <div className="messageInfo">
                      <div className="messageMeta">
                        <div className="title">
                          <strong>{props.client}</strong>
                        </div>

                        <div className="date">{dateParse(props.date)}</div>
                      </div>

                      <div className="messageText">
                        <div className="title">
                          <strong>{props.title}</strong>
                        </div>

                        <div className="text">{props.text}</div>
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
