import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProjects } from "ducks";
import { selectProjects } from "redux/selectors";

import ProjectsPageComponent from "./component";

const ProjectsPageContainer = () => {
  const [compact, changeCompact] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [filter, setFilter] = useState("");
  //const [selectedProject, setSelectedProject] = useState();

  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickEdit = () => history.push("/projects/0");
  const handleToggleModal = () => setModalState(!modalState);
  const handleChange = () => changeCompact(!compact);
  const handleChangeFilter = ({ target: { value } }) => setFilter(value);
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
    let source = axios.CancelToken.source();

    !projects &&
      dispatch(
        getProjects({
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
      handleChangeFilter={handleChangeFilter}
      handleToggleModal={handleToggleModal}
      handleChange={handleChange}
      handleClickEdit={handleClickEdit}
      handleFilterData={handleFilterData}
    />
  );
};

export default ProjectsPageContainer;
