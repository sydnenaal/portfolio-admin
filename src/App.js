import React from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Routes from "./routes";

import { messages_ru } from "locale/messages_ru";
import { messages_en } from "locale/messages_en";
import { selectLanguage } from "redux/selectors";

const messages = {
  en: messages_en,
  ru: messages_ru,
};

const App = () => {
  const language = useSelector(selectLanguage);

  return (
    <>
      <IntlProvider locale={language} messages={messages[language]}>
        <Router>
          <Routes />
        </Router>
      </IntlProvider>

      <NotificationContainer />
    </>
  );
};

export default App;
