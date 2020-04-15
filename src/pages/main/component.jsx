import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Card } from "semantic-ui-react";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import ThemeContext from "../../contexts/theme";
import ThemeStyle from "../../constants/themingStyles";

const MainPageComponent = (props) => {
  const theme = useContext(ThemeContext);

  const {
    messages: {
      titles,
      home: { title, visitors, messages },
    },
  } = useIntl();

  return (
    <PageWithHeader title={titles.home} {...props}>
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
