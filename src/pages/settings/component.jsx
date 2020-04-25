import React, { useContext } from "react";
import { useIntl } from "react-intl";
import {
  Card,
  Radio,
  Menu,
  Dropdown,
  Input,
  Button,
  Icon,
} from "semantic-ui-react";

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
  handleReset,
  isContactDataChangeShow,
  isPasswordChangeShow,
  handleOpenPasswordChange,
  ...props
}) => {
  const {
    messages: { titles, settings },
  } = useIntl();

  const theme = useContext(ThemeContext);

  const style = {
    transform: `rotate(${isPasswordChangeShow ? 180 : 0}deg)`,
  };

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
                <div className="passordChangeHeader">
                  <p>{settings.password}</p>

                  <div
                    className="chevronIcon"
                    onClick={handleOpenPasswordChange}
                    style={style}>
                    <Icon name="chevron down"></Icon>
                  </div>
                </div>

                <div
                  className="passwordChange"
                  data-open={isPasswordChangeShow ? "open" : "close"}>
                  <div className="passwordChange-input">
                    <Input
                      size="small"
                      fluid
                      placeholder={settings.enterPasswordPlaceholder}
                    />
                  </div>

                  <div className="passwordChange-input">
                    <Input
                      size="small"
                      fluid
                      placeholder={settings.repeatPasswordPlaceholder}
                    />
                  </div>

                  <div className="passwordChange-button">
                    <Button>{settings.savePassword}</Button>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="settingsItem">
          <Card fluid style={ThemeStyle[theme]}>
            <Card.Content>
              <div>
                <div className="passordChangeHeader">
                  <p>{settings.userData}</p>

                  <div className="chevronIcon">
                    <Icon name="chevron down"></Icon>
                  </div>
                </div>

                <div></div>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="settingsItem">
          <Card fluid style={ThemeStyle[theme]}>
            <Card.Content>
              <div id="reset">
                <p>{settings.reset}</p>

                <div>
                  <Button onClick={handleReset}>{settings.resetButton}</Button>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </PageWithHeader>
  );
};

export default React.memo(SettingsPageComponent);
