/* eslint-disable react/display-name */
import React from "react";
import { connect } from "react-redux";
import { Label, Loader } from "semantic-ui-react";

import ThemeStyle from "../../../constants/themingStyles";

import Card from "../../../containers/card";
import Message from "./message";

import { setTab } from "../../../redux/actions";

const mapStateToProps = (state) => ({
  loading: state.appState.isLoading,
  activeTab: state.messages.activeTab,
  theme: state.theme.theme,
});

const mapDispatchToProps = { setActiveTab: setTab };

export const Content = connect(
  mapStateToProps,
  null
)(({ content, loading, handleCheck }) => {
  return (
    <Card>
      <div className="messagesInnerArea">
        {loading ? (
          <Loader active inline="centered" />
        ) : content && content.length > 0 ? (
          content.map((item, index) => (
            <Message
              {...item}
              handleCheck={handleCheck}
              index={index}
              key={index}
            />
          ))
        ) : (
          "empty"
        )}
      </div>
    </Card>
  );
});

export const Tab = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ title, activeTab, messagesCounter, locale, theme, setActiveTab }) => {
  const isActive = activeTab === title;

  const activeColor = theme === "dark" ? "white" : "grey";

  const borderColor = isActive ? activeColor : "transparent";

  const handleClick = () => setActiveTab(title);

  return (
    <div
      style={{ borderBottom: `2px solid ${borderColor}` }}
      className="tab"
      key={title}
      onClick={handleClick}>
      <span style={ThemeStyle[theme]}>{locale.tabs[title]}</span>
      {messagesCounter && <Label>{messagesCounter}</Label>}
    </div>
  );
});
