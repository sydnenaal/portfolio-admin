import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

import "./style.sass";
import { selectTheme } from "selectors";

import PageWithHeader from "containers/pageWithHeader";
import { themeStyle } from "constants/themingStyles";
import components from "./components";
import Card from "containers/card";

const SettingsPageComponent = () => {
  const { messages } = useIntl();

  const theme = useSelector(selectTheme);

  return (
    <PageWithHeader title={messages.titles.settings}>
      <div className="settingsBody">
        {components.map((SettingsComponent, index) => (
          <div key={index} className="settingsItem">
            <Card padding="15px" style={themeStyle[theme]}>
              <SettingsComponent locale={messages} />
            </Card>
          </div>
        ))}
      </div>
    </PageWithHeader>
  );
};

export default memo(SettingsPageComponent);
