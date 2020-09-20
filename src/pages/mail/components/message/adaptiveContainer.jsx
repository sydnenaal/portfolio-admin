import React, { useState, memo, useCallback } from "react";
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

  //TODO: использовать ReactDOM
  const isMobileMode = useMemo(() => {
    const { clientWidth } = document.documentElement;

    return clientWidth < 500;
  }, []);

  const translateStyle = useMemo(() => {
    if (isMobileMode) {
      return { paddingLeft: position };
    }

    return null;
  }, [isMobileMode, position]);

  const messageComponentStyles = useMemo(() => {
    return clsx({
      messageComponent: true,
      openMessageSubmenu: isOpen && !isMobileMode,
      deleted: isDeleted,
    });
  }, [isOpen, isMobileMode, isDeleted]);

  const handleTouchMove = useCallback(
    (e) => {
      e.stopPropagation();

      const targetPosition = e.touches[0].clientX - startPosition;
      const isPositionInScope = targetPosition < 100 && targetPosition > 0;

      if (isPositionInScope) {
        setPosition(targetPosition);
      }
    },
    [startPosition]
  );

  const handlePreventContextMenu = useCallback((e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleTouchStart = useCallback((e) => {
    setStartPosition(e.touches[0].clientX);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpen((isOpen) => {
      if (isOpen) {
        return false;
      }

      return isOpen;
    });
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const target = e.changedTouches[0].clientX - startPosition;

      setPosition(target > 50 ? "100px" : "0px");
    },
    [startPosition]
  );

  if (isMobileMode) {
    return (
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
    );
  }

  return (
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

export default memo(AdaptiveContainer);
