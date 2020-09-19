import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Card, Input, Button } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./style.sass";
import PageWithHeader from "containers/pageWithHeader";
import Table from "containers/table";
import WithLoader from "containers/withLoader";
import AddProjectModal from "./components/projectAddModal";
import { headerNames } from "constants/tableConstants";
import { themeStyle } from "constants/themingStyles";
import { selectTheme, selectProjects, selectIsDenseProjects } from "selectors";
import { getProjects, deleteProjects } from "api";
import { setProjects } from "ducks";

const countSelected = (array) =>
  array.reduce((acc, { isChecked }) => acc + Number(isChecked), 0);

const getCheckedProjects = (projects) =>
  projects.filter(({ isChecked }) => isChecked).map(({ _id }) => _id);

const source = axios.CancelToken.source();

function ProjectsPageComponent({}) {
  const {
    messages: { titles, projects: formatProjects },
  } = useIntl();

  const theme = useSelector(selectTheme);
  const projectsData = useSelector(selectProjects);
  const isMobileMode = document.documentElement.clientWidth < 500;

  const projects = useSelector(selectProjects);
  const isDense = useSelector(selectIsDenseProjects);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalState, setModalState] = useState(false);
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(0);

  const handleClickEdit = useCallback(() => {
    history.push("/projects/0");
  }, []);

  const handleToggleModal = useCallback(() => {
    setModalState(!modalState);
  }, []);

  const handleChangeFilter = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const handleFilterData = useCallback((data) => {
    function filterValues(value) {
      const stringifyValue = value.toString().toLowerCase();
      const indexOfRule = stringifyValue.indexOf(filter.toLowerCase());

      return indexOfRule !== -1;
    }

    function filterAllData(item) {
      const validValues = Object.values(item).filter(filterValues);

      return validValues.length > 0;
    }

    return data.filter(filterAllData);
  }, []);

  const handleDeleteProjects = useCallback(() => {
    const checked = getCheckedProjects(projects);
    const fetchData = {
      title: "deleteProjects",
      cancelToken: source.token,
      data: { data: checked },
    };

    dispatch(deleteProjects(fetchData));
  }, [projects, source]);

  const handleCheck = useCallback(
    (id) => {
      function findAndCheckProject(project) {
        let { isChecked, _id } = project;

        if (_id === id) {
          isChecked = !isChecked;
        }

        return { ...project, isChecked };
      }

      const checkedProjects = projects.map(findAndCheckProject);

      dispatch(setProjects(checkedProjects));
      setChecked(countSelected(checkedProjects));
    },
    [projects]
  );

  function handleCheckAll(isChecked) {
    const checkedProjects = projects.map((item) => ({ ...item, isChecked }));

    dispatch(setProjects(checkedProjects));
    setChecked(countSelected(checkedProjects));
  }

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!projects) {
      const fetchData = {
        title: "getProjects",
        cancelToken: source.token,
      };

      dispatch(getProjects(fetchData));
    }

    setChecked(countSelected(projects));

    return source.cancel;
  }, [dispatch, projects]);

  return (
    <PageWithHeader title={titles.projects}>
      <div className="projectsBody">
        <Card fluid style={themeStyle[theme]}>
          <Card.Content>
            <div className="projectsContent">
              <div className="projectsTitle">{formatProjects.title}</div>
              <div className="projectsActions">
                <div className="searchProjects">
                  <Input
                    fluid={isMobileMode}
                    icon="search"
                    placeholder={formatProjects.search}
                    onChange={handleChangeFilter}
                  />
                </div>
                <div className="projectsButtons">
                  <div className="crudButton">
                    <Button onClick={handleToggleModal}>
                      {formatProjects.add}
                    </Button>
                  </div>
                  <div className="crudButton">
                    <Button
                      disabled={checked === 0}
                      onClick={handleDeleteProjects}
                    >
                      {formatProjects.delete}
                    </Button>
                  </div>
                  <div className="crudButton">
                    <Button disabled={checked !== 1} onClick={handleClickEdit}>
                      {formatProjects.update}
                    </Button>
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
                      compact={isDense}
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
}

export default ProjectsPageComponent;
