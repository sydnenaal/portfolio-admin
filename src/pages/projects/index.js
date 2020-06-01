import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProjects } from "ducks";
import { dateParse } from "utils";
import { setAppState, setProjects } from "redux/actions";
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

    const fetchProjects = async (source) => {
      dispatch(setAppState(true));

      const response = await getProjects({
        cancelToken: source.token,
      });

      if (response) {
        const responseWithChecked = response.map((item) => ({
          ...item,
          isChecked: false,
          createDate: dateParse(item.createDate),
        }));

        dispatch(setProjects(responseWithChecked));
      }

      dispatch(setAppState(false));
    };

    !projects && fetchProjects(source);

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
