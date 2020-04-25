import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import { Card, Icon, Checkbox } from "semantic-ui-react";

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
  const [transition, setTransition] = useState(`.${index + 1}s`);

  const theme = useContext(ThemeContext);

  const iconName = isRead ? "envelope open outline" : "envelope outline";

  const handlers = {
    handleClick: () => history.push(`mail/${id}`),
    handleDateParse: (date) => moment(date).format("MMM Do YY hh:mm"),
    handleChangeTransition: () => setTransition(".3s"),
    handleChange: () => handleCheck(id),
    handleContextMenu: (e) => e.preventDefault(),
    handleMouseLeave: () => setIsOpen(false),
    handleMouseDown: (e) => {
      e.preventDefault();
      e.button === 2 && setIsOpen(!isOpen);
    },
  };

  return (
    <CSSTransition
      in
      appear
      onEntered={handlers.handleChangeTransition}
      timeout={1000}
      classNames="example">
      <div
        className="messageComponent"
        onMouseLeave={handlers.handleMouseLeave}
        style={{
          paddingLeft: isOpen ? "100px" : "5px",
          transitionDuration: transition,
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
          <Card fluid style={ThemeStyle[theme]}>
            <Card.Content
              onContextMenu={handlers.handleContextMenu}
              onMouseDown={handlers.handleMouseDown}>
              <div className="messageContent">
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
                    <Icon size="huge" name={iconName}></Icon>
                  </div>

                  <div className="messageInfo">
                    <div className="messageMeta">
                      <div className="title">
                        <strong>{client}</strong>
                      </div>

                      <div className="date">
                        {handlers.handleDateParse(date)}
                      </div>
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
            </Card.Content>
          </Card>
        </div>
      </div>
    </CSSTransition>
  );
};

export default React.memo(Message);
