import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Card, Input, Button } from "semantic-ui-react";
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
import { useRequest } from "hooks";
import { dateParse } from "utils";

function countSelected(array) {
  if (!array) {
    return 0;
  }

  return array.reduce((acc, { isChecked }) => acc + Number(isChecked), 0);
}

function getCheckedProjects(projects) {
  if (!projects) {
    return [];
  }

  return projects.filter(({ isChecked }) => isChecked).map(({ _id }) => _id);
}

function ProjectsPageComponent() {
  const {
    messages: { titles, projects: formatProjects },
  } = useIntl();

  const theme = useSelector(selectTheme);
  const projectsData = useSelector(selectProjects);
  const projects = useSelector(selectProjects);
  const isDense = useSelector(selectIsDenseProjects);
  const dispatch = useDispatch();
  const history = useHistory();
  const queryWrapper = useRequest();
  const [modalState, setModalState] = useState(false);
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(0);
  const isMobileMode = useMemo(() => {
    const { clientWidth } = document.documentElement;

    return clientWidth < 500;
  }, []);

  const handleClickEdit = useCallback(() => {
    history.push("/projects/0");
  }, [history]);

  const handleToggleModal = useCallback(() => {
    setModalState((modalState) => !modalState);
  }, []);

  const handleChangeFilter = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const handleFilterData = useCallback(
    (data) => {
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
    },
    [filter]
  );

  const checkProjects = useCallback(
    (response) => {
      const { data } = response;
      const responseWithChecked = data.map((item) => ({
        ...item,
        isChecked: false,
        createDate: dateParse(item.createDate),
      }));

      dispatch(setProjects(responseWithChecked));
    },
    [dispatch]
  );

  const handleDeleteProjects = useCallback(() => {
    const checked = getCheckedProjects(projects);
    const fetchData = {
      ...deleteProjects,
      title: "deleteProjects",
      body: { data: checked },
    };

    dispatch(queryWrapper(fetchData, checkProjects));
  }, [projects, dispatch, queryWrapper, checkProjects]);

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
    [projects, dispatch]
  );

  const handleCheckAll = useCallback(
    (isChecked) => {
      const checkedProjects = projects.map((item) => ({ ...item, isChecked }));

      dispatch(setProjects(checkedProjects));
      setChecked(countSelected(checkedProjects));
    },
    [dispatch, projects]
  );

  useEffect(() => {
    if (!projects) {
      const params = {
        ...getProjects,
        title: "getProjects",
      };

      dispatch(queryWrapper(params, checkProjects));
    }

    setChecked(countSelected(projects));
  }, [dispatch, projects, queryWrapper, checkProjects]);

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
