import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

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

  const handlers = {
    handleChange: () => changeCompact(!compact),
    handleChangeFilter: ({ target: { value } }) => setFilter(value),
    handleFilterData: (data) =>
      data.filter((item) => {
        let isValid = false;

        const search = (value) => {
          if (
            value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1
          ) {
            isValid = true;
          }
        };

        _.forEach(item, search);

        return isValid;
      }),
  };

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
      handleChangeFilter={handlers.handleChangeFilter}
      handleChange={handlers.handleChange}
      handleFilterData={handlers.handleFilterData}
    />
  );
};

export default ProjectsPageContainer;
