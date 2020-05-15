import React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Card } from "semantic-ui-react";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import ThemeStyle from "../../constants/themingStyles";

const ProjectSavePageComponent = ({ theme }) => {
  const {
    messages: { titles },
  } = useIntl();

  return (
    <PageWithHeader title={titles.projects} subtitle={"read"}>
      <div className="mainBody"></div>
    </PageWithHeader>
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, null)(ProjectSavePageComponent);
