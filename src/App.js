import React from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Routes from "./routes";

import { messages_ru } from "./locale/messages_ru";
import { messages_en } from "./locale/messages_en";

const messages = {
  en: messages_en,
  ru: messages_ru,
};

const App = ({ language }) => (
  <>
    <IntlProvider locale={language} messages={messages[language]}>
      <Router>
        <Routes language={language} />
      </Router>
    </IntlProvider>

    <NotificationContainer />
  </>
);

const mapStateToProps = (state) => {
  return {
    language: state.language.language,
  };
};

export default connect(mapStateToProps, null)(App);
