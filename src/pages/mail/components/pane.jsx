/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Label, Menu, Loader } from "semantic-ui-react";

import ThemeContext from "../../../contexts/theme";
import ThemeStyle from "../../../constants/themingStyles";
import Card from "../../../containers/card";

const Pane = ({
  title,
  style,
  content,
  messagesCounter,
  loading,
  locale,
  setActiveTab,
}) => {
  const theme = useContext(ThemeContext);

  return {
    menuItem: (
      <Menu.Item key={title} onClick={() => setActiveTab(title)}>
        <span style={ThemeStyle[theme]}>{locale.tabs[title]}</span>
        {messagesCounter && <Label>{messagesCounter}</Label>}
      </Menu.Item>
    ),
    render: () => (
      <Card>
        <div className="messagesInnerArea">
          {loading ? (
            <Loader active inline="centered" />
          ) : content && content.length > 0 ? (
            content
          ) : (
            "empty"
          )}
        </div>
      </Card>
    ),
  };
};

export default Pane;
