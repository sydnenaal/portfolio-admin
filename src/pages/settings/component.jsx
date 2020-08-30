import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

import "./style.sass";
import { selectTheme } from "selectors";

import PageWithHeader from "containers/pageWithHeader";
import { themeStyle } from "constants/themingStyles";
import {
  mainComponents,
  userComponents,
  messagesComponents,
  projectsComponents,
} from "./components";
import Card from "containers/card";

const SettingsPageComponent = () => {
  const { messages } = useIntl();

  const theme = useSelector(selectTheme);

  return (
    <PageWithHeader title={messages.titles.settings}>
      <div className="settingsPage">
        <div className="settingsTitle_main">Основные</div>
        <div className="settingsBody">
          {mainComponents.map((SettingsComponent, index) => (
            <div key={index} className="settingsItem">
              <Card padding="15px" style={themeStyle[theme]}>
                <SettingsComponent locale={messages} />
              </Card>
            </div>
          ))}
        </div>
        <div className="settingsTitle_user">Пользователь</div>
        <div className="settingsBody">
          {userComponents.map((SettingsComponent, index) => (
            <div key={index} className="settingsItem">
              <Card padding="15px" style={themeStyle[theme]}>
                <SettingsComponent locale={messages} />
              </Card>
            </div>
          ))}
        </div>
        <div className="settingsTitle_projects">Проекты</div>
        <div className="settingsBody">
          {projectsComponents.map((SettingsComponent, index) => (
            <div key={index} className="settingsItem">
              <Card padding="15px" style={themeStyle[theme]}>
                <SettingsComponent locale={messages} />
              </Card>
            </div>
          ))}
        </div>
        <div className="settingsTitle_messages">Сообщения</div>
        <div className="settingsBody">
          {messagesComponents.map((SettingsComponent, index) => (
            <div key={index} className="settingsItem">
              <Card padding="15px" style={themeStyle[theme]}>
                <SettingsComponent locale={messages} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </PageWithHeader>
  );
};

export default memo(SettingsPageComponent);
