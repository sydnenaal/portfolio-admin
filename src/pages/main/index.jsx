import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";

import "./style.sass";
import PageWithHeader from "containers/pageWithHeader";
import { themeStyle } from "constants/themingStyles";
import WithLoader from "containers/withLoader";
import Card from "containers/card";
import { useRequest } from "hooks";
import { getMainInfo } from "api/main";
import { setVisits, setNewMessagesCounter } from "ducks";
import {
  selectNewMessagesCounter,
  selectVisits,
  selectUserData,
  selectTheme,
} from "selectors";

function MainPageComponent() {
  const {
    messages: {
      titles,
      home: { title, visitors, messages },
    },
  } = useIntl();

  const theme = useSelector(selectTheme);
  const counter = useSelector(selectNewMessagesCounter);
  const visits = useSelector(selectVisits);
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  const queryWrapper = useRequest();
  const name = useMemo(() => user.name.split(" ")[0], [user]);

  useEffect(() => {
    const params = { ...getMainInfo, title: "getMainPageInfo" };

    function handleSuccess(response) {
      dispatch(setNewMessagesCounter(response.data.counter));
      dispatch(setVisits(response.data.visits));
    }

    dispatch(queryWrapper(params, handleSuccess));
  }, [dispatch, queryWrapper]);

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
                  <p>{`${visitors.day}: ${visits.day}`}</p>
                  <p>{`${visitors.week}: ${visits.week}`}</p>
                  <p>{`${visitors.month}: ${visits.month}`}</p>
                </div>
              </Card>
            </div>
          </div>
        </WithLoader>
      </div>
    </PageWithHeader>
  );
}

export default MainPageComponent;
