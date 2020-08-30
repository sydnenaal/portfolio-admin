import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";

import "./style.sass";
import { selectTheme } from "selectors";

import PageWithHeader from "containers/pageWithHeader";
import { themeStyle } from "constants/themingStyles";
import WithLoader from "containers/withLoader";
import Card from "containers/card";

const MainPageComponent = ({ counter, visits, user }) => {
  const {
    messages: {
      titles,
      home: { title, visitors, messages },
    },
  } = useIntl();

  const name = user.name.split(" ")[0];
  const theme = useSelector(selectTheme);

  return (
    <PageWithHeader title={titles.home}>
      <div className="mainBody">
        <div className="helloWorld">
          <Card padding="10px" style={themeStyle[theme]}>
            <div className="welcomeSlogan">
              <p>{`${title} ${name}`}</p>
            </div>
          </Card>
        </div>

        <WithLoader title="getMainPageInfo">
          <div className="mainInformation">
            <div className="infoBlock">
              <Card padding="10px" style={themeStyle[theme]}>
                <div className="newMessages">
                  <p className="infoTitle">{messages.title}</p>

                  <p>{counter}</p>
                </div>
              </Card>
            </div>
            <div className="infoBlock">
              <Card padding="10px" style={themeStyle[theme]}>
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
              </Card>
            </div>
          </div>
        </WithLoader>
      </div>
    </PageWithHeader>
  );
};

export default MainPageComponent;
