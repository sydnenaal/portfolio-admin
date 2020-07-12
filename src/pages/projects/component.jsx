import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Card, Input, Button, Radio } from "semantic-ui-react";

import "./style.sass";

import PageWithHeader from "containers/pageWithHeader";
import Table from "containers/table";
import WithLoader from "containers/withLoader";
import AddProjectModal from "./components/projectAddModal";

import { headerNames } from "constants/tableConstants";
import { themeStyle } from "constants/themingStyles";
import { selectTheme, selectProjects } from "selectors";

const ProjectsPageComponent = ({
  compact,
  handleChange,
  handleChangeFilter,
  handleFilterData,
  handleToggleModal,
  modalState,
  handleClickEdit,
  handleCheck,
  handleCheckAll,
  checked,
  handleDeleteProjects,
}) => {
  const {
    messages: { titles, projects },
  } = useIntl();

  const theme = useSelector(selectTheme);
  const projectsData = useSelector(selectProjects);
  const isMobileMode = document.documentElement.clientWidth < 500;

  return (
    <PageWithHeader title={titles.projects}>
      <div className="projectsBody">
        <Card fluid style={themeStyle[theme]}>
          <Card.Content>
            <div className="projectsContent">
              <div className="projectsTitle">{projects.title}</div>

              <div className="projectsActions">
                <div className="searchProjects">
                  <Input
                    fluid={isMobileMode}
                    icon="search"
                    placeholder={projects.search}
                    onChange={handleChangeFilter}
                  />
                </div>
                <div className="projectsButtons">
                  <div className="crudButton">
                    <Button onClick={handleToggleModal}>{projects.add}</Button>
                  </div>

                  <div className="crudButton">
                    <Button
                      disabled={checked === 0}
                      onClick={handleDeleteProjects}
                    >
                      {projects.delete}
                    </Button>
                  </div>

                  <div className="crudButton">
                    <Button disabled={checked !== 1} onClick={handleClickEdit}>
                      {projects.update}
                    </Button>
                  </div>

                  <div className="crudButton">
                    <Radio
                      toggle
                      onChange={handleChange}
                      label={projects.dense}
                    />
                  </div>
                </div>
              </div>

              <div className="projectsTable">
                <WithLoader title="getProjects">
                  {projectsData && (
                    <Table
                      handleCheckAll={handleCheckAll}
                      handleCheck={handleCheck}
                      showPagination={true}
                      compact={compact}
                      headerNames={headerNames}
                      tableData={handleFilterData(projectsData)}
                    />
                  )}
                </WithLoader>
              </div>
            </div>
          </Card.Content>
        </Card>
        <AddProjectModal
          modalState={modalState}
          handleToggleModal={handleToggleModal}
        />
      </div>
    </PageWithHeader>
  );
};

export default ProjectsPageComponent;
