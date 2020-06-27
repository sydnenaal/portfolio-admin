import React from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ReactNotification from "react-notifications-component";

import Routes from "./routes";

import { messages_ru } from "locale/messages_ru";
import { messages_en } from "locale/messages_en";
import { selectLanguage } from "selectors";

const messages = {
  en: messages_en,
  ru: messages_ru,
};

const App = () => {
  const language = useSelector(selectLanguage);

  return (
    <>
      <ReactNotification />
      <IntlProvider locale={language} messages={messages[language]}>
        <Router>
          <Routes />
        </Router>
      </IntlProvider>
    </>
  );
};

export default App;
