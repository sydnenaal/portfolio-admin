/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Card, Label, Menu, Loader } from "semantic-ui-react";

import ThemeContext from "../../../contexts/theme";
import ThemeStyle from "../../../constants/themingStyles";

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
      <Card fluid style={style}>
        <Card.Content>
          {loading ? (
            <Loader active inline="centered" />
          ) : content && content.length > 0 ? (
            content
          ) : (
            "empty"
          )}
        </Card.Content>
      </Card>
    ),
  };
};

export default Pane;
