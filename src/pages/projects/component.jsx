import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { Card, Input, Button, Radio } from "semantic-ui-react";

import "./style.sass";

import PageWithHeader from "../../containers/pageWithHeader";
import Table from "../../containers/table";
import ThemeContext from "../../contexts/theme";

import { headerNames, tableData } from "../../constants/tableConstants";
import ThemeStyle from "../../constants/themingStyles";

const ProjectsPageComponent = ({
  compact,
  handleChange,
  handleChangeFilter,
  handleFilterData,
  ...props
}) => {
  const {
    messages: { titles, projects },
  } = useIntl();

  const theme = useContext(ThemeContext);

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
                <Table
                  showPagination={true}
                  compact={compact}
                  headerNames={headerNames}
                  tableData={handleFilterData(tableData)}
                />
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </PageWithHeader>
  );
};

export default ProjectsPageComponent;
