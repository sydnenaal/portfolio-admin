import React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { Card, Input, Button, Radio, Loader } from "semantic-ui-react";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import Table from "../../containers/table";

import { headerNames } from "../../constants/tableConstants";
import ThemeStyle from "../../constants/themingStyles";

const ProjectsPageComponent = ({
  compact,
  handleChange,
  handleChangeFilter,
  handleFilterData,
  theme,
  loading,
  projectsData,
  ...props
}) => {
  const {
    messages: { titles, projects },
  } = useIntl();

  return (
    <PageWithHeader title={titles.projects} {...props}>
      <div className="projectsBody">
        <Card fluid style={ThemeStyle[theme]}>
          <Card.Content>
            <div className="projectsContent">
              <div className="projectsTitle">{projects.title}</div>

              <div className="projectsActions">
                <div className="projectsButtons">
                  <div className="crudButton">
                    <Button>{projects.add}</Button>
                  </div>

                  <div className="crudButton">
                    <Button>{projects.delete}</Button>
                  </div>

                  <div className="crudButton">
                    <Button>{projects.update}</Button>
                  </div>

                  <div className="crudButton">
                    <p>{projects.dense}</p>

                    <Radio toggle onChange={handleChange} />
                  </div>
                </div>

                <Input
                  icon="search"
                  placeholder={projects.search}
                  onChange={handleChangeFilter}
                />
              </div>

              <div className="projectsTable">
                {loading ? (
                  <Loader active inline="centered" />
                ) : (
                  projectsData && (
                    <Table
                      showPagination={true}
                      compact={compact}
                      headerNames={headerNames}
                      tableData={handleFilterData(projectsData)}
                    />
                  )
                )}
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </PageWithHeader>
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  projectsData: state.projects.projects,
  loading: state.appState.isLoading,
});

export default connect(mapStateToProps, null)(ProjectsPageComponent);
