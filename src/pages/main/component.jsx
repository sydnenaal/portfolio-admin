import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Card } from "semantic-ui-react";

import "./style.sass";
import { selectTheme } from "redux/selectors";

import PageWithHeader from "containers/pageWithHeader";
import { themeStyle } from "constants";

const MainPageComponent = () => {
  const {
    messages: {
      titles,
      home: { title, visitors, messages },
    },
  } = useIntl();

  const theme = useSelector(selectTheme);

  return (
    <PageWithHeader title={titles.home}>
      <div className="mainBody">
        <div className="helloWorld">
          <Card style={ThemeStyle[theme]} fluid>
            <Card.Content>
              <div className="welcomeSlogan">
                <p>{title}</p>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="mainInformation">
          <div className="infoBlock">
            <Card style={ThemeStyle[theme]} fluid>
              <Card.Content>
                <div className="newMessages">
                  <p className="infoTitle">{messages.title}</p>

                  <p>0</p>
                </div>
              </Card.Content>
            </Card>
          </div>

          <div className="infoBlock">
            <Card style={ThemeStyle[theme]} fluid>
              <Card.Content>
                <div className="visitors">
                  <p className="infoTitle">{visitors.title}</p>

                  <p>{visitors.day}: 0</p>

                  <p>{visitors.week}: 0</p>

                  <p>{visitors.month}: 0</p>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </PageWithHeader>
  );
};

export default MainPageComponent;
