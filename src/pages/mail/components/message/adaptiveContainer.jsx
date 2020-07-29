import React, { useState } from "react";
import clsx from "clsx";

const AdaptiveContainer = ({
  children,
  setIsOpen,
  isOpen,
  isDeleted,
  handleDeleteOnAnimationEnd,
}) => {
  const [startPosition, setStartPosition] = useState(0);
  const [position, setPosition] = useState(0);

  const isMobileMode = document.documentElement.clientWidth < 500;
  const translateStyle = isMobileMode ? { paddingLeft: position } : null;
  const messageComponentStyles = clsx({
    messageComponent: true,
    openMessageSubmenu: isOpen && !isMobileMode,
    deleted: isDeleted,
  });

  const handleTouchMove = (e) => {
    e.stopPropagation();
    const targetPosition = e.touches[0].clientX - startPosition;
    const isPositionInScope = targetPosition < 100 && targetPosition > 0;
    isPositionInScope && setPosition(targetPosition);
  };

  const handlePreventContextMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleTouchStart = (e) => setStartPosition(e.touches[0].clientX);
  const handleMouseLeave = () => isOpen && setIsOpen(false);
  const handleTouchEnd = (e) => {
    const target = e.changedTouches[0].clientX - startPosition;
    setPosition(target > 50 ? "100px" : "0px");
  };

  return isMobileMode ? (
    <div
      onAnimationEnd={handleDeleteOnAnimationEnd}
      className={messageComponentStyles}
      style={translateStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  ) : (
    <div
      onAnimationEnd={handleDeleteOnAnimationEnd}
      className={messageComponentStyles}
      style={translateStyle}
      onContextMenu={handlePreventContextMenu}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default AdaptiveContainer;
