import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProjects, deleteProjects } from "api";
import { selectProjects } from "selectors";
import { setProjects } from "ducks";

import ProjectsPageComponent from "./component";

const countSelected = (array) =>
  array.reduce((acc, item) => acc + Number(item.isChecked), 0);

const getCheckedProjects = (projects) =>
  projects.filter((item) => item.isChecked).map((item) => item._id);

const ProjectsPageContainer = () => {
  const projects = useSelector(selectProjects);
  const isDense = useSelector((state) => state.projects.isDense);
  const dispatch = useDispatch();
  const history = useHistory();
  const source = axios.CancelToken.source();

  const [modalState, setModalState] = useState(false);
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(0);

  const handleClickEdit = () => history.push("/projects/0");
  const handleToggleModal = () => setModalState(!modalState);
  const handleChangeFilter = ({ target: { value } }) => setFilter(value);
  const handleDeleteProjects = () => {
    const checked = getCheckedProjects(projects);
    const fetchData = {
      title: "deleteProjects",
      cancelToken: source.token,
      data: { data: checked },
    };
    dispatch(deleteProjects(fetchData));
  };

  const handleCheck = (id) => {
    const checkedProjects = projects.map((item) => ({
      ...item,
      isChecked: item._id === id ? !item.isChecked : item.isChecked,
    }));

    dispatch(setProjects(checkedProjects));
    setChecked(countSelected(checkedProjects));
  };

  const handleCheckAll = (value) => {
    const checkedProjects = projects.map((item) => ({
      ...item,
      isChecked: value,
    }));

    dispatch(setProjects(checkedProjects));
    setChecked(countSelected(checkedProjects));
  };

  const handleFilterData = (data) => {
    const callback = (value) =>
      value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;

    return data.filter(
      (item) => Object.values(item).filter(callback).length > 0
    );
  };

  useEffect(() => {
    projects && setChecked(countSelected(projects));
  }, [projects]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = {
      title: "getProjects",
      cancelToken: source.token,
    };
    !projects && dispatch(getProjects(fetchData));

    return source.cancel;
  }, [dispatch, projects]);

  return (
    <ProjectsPageComponent
      modalState={modalState}
      checked={checked}
      isDense={isDense}
      handleChangeFilter={handleChangeFilter}
      handleToggleModal={handleToggleModal}
      handleDeleteProjects={handleDeleteProjects}
      handleCheck={handleCheck}
      handleCheckAll={handleCheckAll}
      handleClickEdit={handleClickEdit}
      handleFilterData={handleFilterData}
    />
  );
};

export default ProjectsPageContainer;
