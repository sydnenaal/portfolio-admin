import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProjects, deleteProjects } from "api";
import { selectProjects } from "redux/selectors";
import { setProjects } from "redux/actions";

import ProjectsPageComponent from "./component";

const countSelected = (array) =>
  array.reduce((acc, item) => acc + Number(item.isChecked), 0);

const getCheckedProjects = (projects) =>
  projects.filter((item) => item.isChecked).map((item) => item._id);

const ProjectsPageContainer = () => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const history = useHistory();
  const source = axios.CancelToken.source();

  const [compact, changeCompact] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(0);

  const handleClickEdit = () => history.push("/projects/0");
  const handleToggleModal = () => setModalState(!modalState);
  const handleChange = () => changeCompact(!compact);
  const handleChangeFilter = ({ target: { value } }) => setFilter(value);
  const handleDeleteProjects = () => {
    const checked = getCheckedProjects(projects);
    dispatch(
      deleteProjects({
        title: "deleteProjects",
        cancelToken: source.token,
        data: { data: checked },
      })
    );
  };

  const handleCheck = (id) => {
    const checkedProjects = projects.map((item) =>
      item._id === id ? { ...item, isChecked: !item.isChecked } : item
    );

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

  const handleFilterData = (data) =>
    data.filter((item) => {
      const filtered = Object.values(item).filter((value) => {
        const index = value
          .toString()
          .toLowerCase()
          .indexOf(filter.toLowerCase());

        return index !== -1;
      });

      return filtered.length > 0;
    });

  useEffect(() => {
    projects && setChecked(countSelected(projects));
  }, [projects]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    !projects &&
      dispatch(
        getProjects({
          title: "getProjects",
          cancelToken: source.token,
        })
      );

    return () => {
      source.cancel();
    };
  }, [dispatch, projects]);

  return (
    <ProjectsPageComponent
      compact={compact}
      modalState={modalState}
      checked={checked}
      handleChangeFilter={handleChangeFilter}
      handleToggleModal={handleToggleModal}
      handleDeleteProjects={handleDeleteProjects}
      handleCheck={handleCheck}
      handleCheckAll={handleCheckAll}
      handleChange={handleChange}
      handleClickEdit={handleClickEdit}
      handleFilterData={handleFilterData}
    />
  );
};

export default ProjectsPageContainer;
