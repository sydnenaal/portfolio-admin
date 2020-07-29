import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Component from "./component";
import { setActiveMessage } from "ducks";
import { setPriorityMessages, setActualityMessages } from "api";

const MessageContainer = ({
  _id,
  isImportant,
  isChecked,
  dispatch,
  index,
  ...props
}) => {
  const reduxDispatch = useDispatch();
  const history = useHistory();

  const [render, setRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAnimationTrigger, setDeleteAnimationTrigger] = useState(false);

  const universalMessageAction = ({ action, handler }) => () => {
    const data = { messages: [_id], action: action };
    setIsOpen(false);
    reduxDispatch(handler({ data }));
  };

  const handleCheckMessage = (_, data) =>
    dispatch({
      type: data.checked ? "CHECK_SINGLE" : "DROP_SINGLE_CHECK",
      payload: _id,
    });

  const handleSetPriority = universalMessageAction({
    action: !isImportant,
    handler: setPriorityMessages,
  });

  const handleDeleteMessage = () => setDeleteAnimationTrigger(true);

  const handleClickOnMessage = () => {
    const activeMessage = {
      title: props.title,
      text: props.text,
      client: props.client,
      date: props.date,
    };
    reduxDispatch(setActiveMessage(activeMessage));
    history.push(`mail/${_id}`);
  };

  const handleDeleteOnAnimationEnd = (e) => {
    if (e.animationName === "fadeOut") {
      setRender(false);
      universalMessageAction({
        action: true,
        handler: setActualityMessages,
      })();
    }
  };

  useEffect(() => {
    const delay = ((index + 1) / 3) * 100;
    setTimeout(() => setRender(true), delay);
  }, [index]);

  return (
    <Component
      handleDeleteOnAnimationEnd={handleDeleteOnAnimationEnd}
      handleDeleteMessage={handleDeleteMessage}
      handleSetPriority={handleSetPriority}
      handleCheckMessage={handleCheckMessage}
      handleClickOnMessage={handleClickOnMessage}
      universalMessageAction={universalMessageAction}
      deleteAnimationTrigger={deleteAnimationTrigger}
      isImportant={isImportant}
      isOpen={isOpen}
      render={render}
      setIsOpen={setIsOpen}
      isChecked={isChecked}
      {...props}
    />
  );
};

export default MessageContainer;
