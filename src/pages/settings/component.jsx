import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Card } from "semantic-ui-react";

import "./style.sass";
import { selectTheme } from "redux/selectors";

import PageWithHeader from "containers/pageWithHeader";
import { themeStyle } from "constants/themingStyles";
import components from "./components";

const SettingsPageComponent = () => {
  const { messages } = useIntl();

  const theme = useSelector(selectTheme);

  return (
    <PageWithHeader title={messages.titles.settings}>
      <div className="settingsBody">
        {components.map((SettingsComponent, index) => (
          <div key={index} className="settingsItem">
            <Card fluid style={themeStyle[theme]}>
              <Card.Content>
                <SettingsComponent locale={messages} />
              </Card.Content>
            </Card>
          </div>
        ))}
      </div>
    </PageWithHeader>
  );
};

export default memo(SettingsPageComponent);
