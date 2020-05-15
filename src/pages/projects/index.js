import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import _ from "lodash";

import { getProjects } from "../../ducks";
import { dateParse } from "../../utils";
import { setAppState, setProjects } from "../../redux/actions";

import ProjectsPageComponent from "./component";

const ProjectsPageContainer = ({ projects, setProjects, setAppState }) => {
  const [compact, changeCompact] = useState(false);
  const [filter, setFilter] = useState("");

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

  const fetchProjects = async (source) => {
    setAppState(true);

    const response = await getProjects({ cancelToken: source.token });

    if (response) {
      const responseWithChecked = response.map((item) => ({
        ...item,
        isChecked: false,
        createDate: dateParse(item.createDate),
      }));

      setProjects(responseWithChecked);
    }

    setAppState(false);
  };

  useEffect(() => {
    let source = axios.CancelToken.source();

    !projects && fetchProjects(source);

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <ProjectsPageComponent
      compact={compact}
      handleChangeFilter={handlers.handleChangeFilter}
      handleChange={handlers.handleChange}
      handleFilterData={handlers.handleFilterData}
    />
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects.projects,
});

const mapDispatchToProps = {
  setAppState: setAppState,
  setProjects: setProjects,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPageContainer);
