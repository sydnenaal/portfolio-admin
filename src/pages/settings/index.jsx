import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";

import { getContactData } from "api";
import { useRequest } from "hooks";
import { selectContacts } from "selectors";
import { setContacts } from "ducks/reducers";
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

function SettingsPageComponent() {
  const { messages } = useIntl();
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const queryWrapper = useRequest();

  useEffect(() => {
    if (!contacts) {
      const params = { ...getContactData, title: "getContacts" };

      function handleSuccess(response) {
        dispatch(setContacts(response.data));
      }

      dispatch(queryWrapper(params, handleSuccess));
    }
  }, [contacts, dispatch]);

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
}

export default memo(SettingsPageComponent);
