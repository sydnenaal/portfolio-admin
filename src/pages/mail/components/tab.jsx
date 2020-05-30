import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "semantic-ui-react";

import ThemeStyle from "constants/themingStyles";
import { setTab } from "redux/actions";
import { selectTheme, selectActiveTab } from "redux/selectors";

import Card from "containers/card";
import WithLoader from "containers/withLoader";
import Message from "./message";

export const Content = ({ content, handleCheck }) => {
  return (
    <Card>
      <div className="messagesInnerArea">
        <WithLoader>
          {content && content.length > 0 ? (
            content.map((item, index) => (
              <Message
                {...item}
                handleCheck={handleCheck}
                index={index}
                key={index}
              />
            ))
          ) : (
            <div className="emptyMessage">Empty</div>
          )}
        </WithLoader>
      </div>
    </Card>
  );
};

export const Tab = ({ title, messagesCounter, locale }) => {
  const activeTab = useSelector(selectActiveTab);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const isActive = activeTab === title;
  const activeColor = theme === "dark" ? "white" : "grey";
  const borderColor = isActive ? activeColor : "transparent";
  const tabStyle = { borderBottom: `2px solid ${borderColor}` };

  const handleClick = () => dispatch(setTab(title));

  return (
    <div style={tabStyle} className="tab" key={title} onClick={handleClick}>
      <span style={ThemeStyle[theme]}>{locale.tabs[title]}</span>
      {messagesCounter && <Label>{messagesCounter}</Label>}
    </div>
  );
};
