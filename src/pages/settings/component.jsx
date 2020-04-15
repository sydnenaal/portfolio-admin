import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Card, Radio, Menu, Dropdown } from "semantic-ui-react";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import ThemeContext from "../../contexts/theme";
import ThemeStyle from "../../constants/themingStyles";
import { languageOptions } from "../../constants/settingsConstants";

const SettingsPageComponent = ({
  isDark,
  handleChangeTheme,
  handleChangeLanguage,
  language,
  ...props
}) => {
  const {
    messages: { titles, settings },
  } = useIntl();

  const theme = useContext(ThemeContext);

  return (
    <PageWithHeader title={titles.settings} {...props}>
      <div className="settingsBody">
        <div className="settingsItem">
          <Card fluid style={ThemeStyle[theme]}>
            <Card.Content>
              <div id="theme">
                <p>{settings.theme}</p>

                <Radio slider checked={isDark} onChange={handleChangeTheme} />
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="settingsItem">
          <Card fluid style={ThemeStyle[theme]}>
            <Card.Content>
              <div id="language">
                <p>{settings.language}</p>

                <Menu compact>
                  <Dropdown
                    options={languageOptions}
                    value={language}
                    onChange={handleChangeLanguage}
                    simple
                    item
                  />
                </Menu>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="settingsItem">
          <Card fluid style={ThemeStyle[theme]}>
            <Card.Content>
              <div>
                <p>{settings.password}</p>
                <div></div>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="settingsItem">
          <Card fluid style={ThemeStyle[theme]}>
            <Card.Content>
              <div>
                <p>{settings.userData}</p>
                <div></div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </PageWithHeader>
  );
};

export default SettingsPageComponent;
