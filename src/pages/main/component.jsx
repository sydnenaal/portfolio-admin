import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Card } from "semantic-ui-react";

import "./style.sass";
import { selectTheme } from "redux/selectors";

import PageWithHeader from "containers/pageWithHeader";
import { themeStyle } from "constants/themingStyles";
import WithLoader from "containers/withLoader";

const MainPageComponent = ({ counter, visits }) => {
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
          <Card style={themeStyle[theme]} fluid>
            <Card.Content>
              <div className="welcomeSlogan">
                <p>{title}</p>
              </div>
            </Card.Content>
          </Card>
        </div>

        <WithLoader title="getMainPageInfo">
          <div className="mainInformation">
            <div className="infoBlock">
              <Card style={themeStyle[theme]} fluid>
                <Card.Content>
                  <div className="newMessages">
                    <p className="infoTitle">{messages.title}</p>

                    <p>{counter}</p>
                  </div>
                </Card.Content>
              </Card>
            </div>
            <div className="infoBlock">
              <Card style={themeStyle[theme]} fluid>
                <Card.Content>
                  <div className="visitors">
                    <p className="infoTitle">{visitors.title}</p>

                    <p>
                      {visitors.day}: {visits.day}
                    </p>

                    <p>
                      {visitors.week}: {visits.week}
                    </p>

                    <p>
                      {visitors.month}: {visits.month}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        </WithLoader>
      </div>
    </PageWithHeader>
  );
};

export default MainPageComponent;
