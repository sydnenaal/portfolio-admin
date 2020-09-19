import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProjects, deleteProjects } from "api";
import { selectProjects } from "selectors";
import { setProjects } from "ducks";

import ProjectsPageComponent from "./component";

function countSelected(array) {
  return array.reduce((acc, { isChecked }) => acc + Number(isChecked), 0);
}

function getCheckedProjects(projects) {
  const getChecked = ({ isChecked }) => isChecked;
  const getId = ({ _id }) => _id;

  return projects.filter(getChecked).map(getId);
}

function ProjectsPageContainer() {
  const projects = useSelector(selectProjects);
  const isDense = useSelector((state) => state.projects.isDense);
  const dispatch = useDispatch();
  const history = useHistory();
  const source = axios.CancelToken.source();

  const [modalState, setModalState] = useState(false);
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(0);

  function handleClickEdit() {
    history.push("/projects/0");
  }

  function handleToggleModal() {
    setModalState(!modalState);
  }

  function handleChangeFilter({ target: { value } }) {
    setFilter(value);
  }

  function handleDeleteProjects() {
    const checked = getCheckedProjects(projects);
    const fetchData = {
      title: "deleteProjects",
      cancelToken: source.token,
      data: { data: checked },
    };

    dispatch(deleteProjects(fetchData));
  }

  function handleCheck(id) {
    const checkedProjects = projects.map((item) => ({
      ...item,
      isChecked: item._id === id ? !item.isChecked : item.isChecked,
    }));

    dispatch(setProjects(checkedProjects));
    setChecked(countSelected(checkedProjects));
  }

  function handleCheckAll(isChecked) {
    function setCheckFlags(item) {
      return { ...item, isChecked };
    }

    const checkedProjects = projects.map(setCheckFlags);

    dispatch(setProjects(checkedProjects));
    setChecked(countSelected(checkedProjects));
  }

  function handleFilterData(data) {
    function filterValues(value) {
      const stringify = value.toString().toLowerCase();

      return stringify.indexOf(filter.toLowerCase()) !== -1;
    }

    function filterAllData(item) {
      const validValues = Object.values(item).filter(filterValues);

      return validValues.length > 0;
    }

    return data.filter(filterAllData);
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
}

export default ProjectsPageContainer;
