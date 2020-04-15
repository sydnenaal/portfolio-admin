import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import ThemeContext from "../../contexts/theme";
import ThemeStyle from "../../constants/themingStyles";

const MainPageComponent = (props) => {
  const theme = useContext(ThemeContext);

  const {
    messages: { titles, mail },
  } = useIntl();

  return (
    <PageWithHeader title={titles.mail} {...props}>
      <div className="mailBody">
        <Card style={ThemeStyle[theme]} fluid>
          <Card.Content>
            <div className="welcomeSlogan">
              <p>{mail.empty}</p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </PageWithHeader>
  );
};

export default MainPageComponent;
