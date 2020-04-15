import React, { useState, useContext } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Routes from "./routes";
import ThemeContext from "./contexts/theme";

import { messages_ru } from "./locale/messages_ru";
import { messages_en } from "./locale/messages_en";

const messages = {
  en: messages_en,
  ru: messages_ru,
};

const App = () => {
  const themeByContext = useContext(ThemeContext);

  const [theme, changeTheme] = useState(themeByContext);
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  return (
    <>
      <IntlProvider locale={language} messages={messages[language]}>
        <ThemeContext.Provider value={theme}>
          <Router>
            <Routes
              changeTheme={changeTheme}
              setLanguage={setLanguage}
              language={language}
            />
          </Router>
        </ThemeContext.Provider>
      </IntlProvider>

      <NotificationContainer />
    </>
  );
};

export default App;
