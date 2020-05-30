import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { getProjects } from "ducks";
import { dateParse } from "utils";
import { setAppState, setProjects } from "redux/actions";
import { selectProjects } from "redux/selectors";

import ProjectsPageComponent from "./component";

const ProjectsPageContainer = () => {
  const [compact, changeCompact] = useState(false);
  const [filter, setFilter] = useState("");

  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const handleChange = () => changeCompact(!compact);
  const handleChangeFilter = ({ target: { value } }) => setFilter(value);
  const handleFilterData = (data) =>
    data.filter((item) => {
      console.log(data);
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
        console.log(response);
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
      handleChangeFilter={handleChangeFilter}
      handleChange={handleChange}
      handleFilterData={handleFilterData}
    />
  );
};

export default ProjectsPageContainer;
