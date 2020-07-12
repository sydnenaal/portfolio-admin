import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Component from "./component";
import { setActiveMessage } from "ducks";
import { setActualityMessages, setPriorityMessages } from "api";

const MessageContainer = ({
  handleCheck,
  id,
  _id,
  isImportant,
  title,
  text,
  client,
  date,
  isRead,
  isChecked,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [position, setPosition] = useState(0);

  const universalMessageAction = ({ action, handler }) => () => {
    const data = { messages: [_id], action: action };
    setIsOpen(false);
    dispatch(handler({ data }));
  };

  const handleCheckMessage = () => handleCheck(id);
  const handlePreventContextMenu = (e) => e.preventDefault();
  const handleTouchStart = (e) => setStartPosition(e.touches[0].clientX);
  const handleMouseLeave = () => isOpen && setIsOpen(false);
  const handleTouchEnd = (e) => {
    const target = e.changedTouches[0].clientX - startPosition;
    setPosition(target > 50 ? "100px" : "0px");
  };
  const handleSetPriority = universalMessageAction({
    action: !isImportant,
    handler: setPriorityMessages,
  });
  const handleDeleteMessage = universalMessageAction({
    action: true,
    handler: setActualityMessages,
  });
  const handleRightClickOnMessage = (e) => {
    e.preventDefault();
    e.button === 2 && setIsOpen(!isOpen);
  };
  const handleClickOnMessage = () => {
    const activeMessage = { title, text, client, date };
    dispatch(setActiveMessage(activeMessage));
    history.push(`mail/${_id}`);
  };
  const handleTouchMove = (e) => {
    e.stopPropagation();
    const targetPosition = e.touches[0].clientX - startPosition;
    const isPositionInScope = targetPosition < 100 && targetPosition > 0;
    isPositionInScope && setPosition(targetPosition);
  };

  const isMobileMode = document.documentElement.clientWidth < 500;
  const iconName = isRead ? "envelope open outline" : "envelope outline";
  const translateStyle = isMobileMode ? { paddingLeft: position } : null;
  const messageComponentStyles = clsx({
    messageComponent: true,
    openMessageSubmenu: isOpen && !isMobileMode,
  });

  useEffect(() => {
    const delay = ((id + 1) / 2) * 100;
    setTimeout(() => setRender(true), delay);
  }, [id]);

  return (
    <Component
      handleDeleteMessage={handleDeleteMessage}
      handleSetPriority={handleSetPriority}
      translateStyle={translateStyle}
      handleTouchMove={handleTouchMove}
      handleCheckMessage={handleCheckMessage}
      handleTouchEnd={handleTouchEnd}
      handleRightClickOnMessage={handleRightClickOnMessage}
      handleClickOnMessage={handleClickOnMessage}
      iconName={iconName}
      render={render}
      handleMouseLeave={handleMouseLeave}
      handleTouchStart={handleTouchStart}
      handlePreventContextMenu={handlePreventContextMenu}
      messageComponentStyles={messageComponentStyles}
      title={title}
      text={text}
      client={client}
      date={date}
      isRead={isRead}
      isImportant={isImportant}
      isChecked={isChecked}
    />
  );
};

export default MessageContainer;
