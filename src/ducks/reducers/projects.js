import {
  SET_ACTIVE_PROJECT,
  SET_PROJECTS,
  SET_SEARCH_FOR,
  SET_IS_DENSE,
} from "ducks/types";

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const setActiveProject = (activeProject) => ({
  type: SET_ACTIVE_PROJECT,
  payload: activeProject,
});

export const setIsDense = (action) => ({
  type: SET_IS_DENSE,
  payload: action,
});

export const setProjectsSearch = (action) => ({
  type: SET_SEARCH_FOR,
  payload: action,
});

const projectsInitialState = {
  projects: null,
  activeProject: "all",
  isDense: !!localStorage.getItem("isDense"),
  searchFor: "client",
};

export const projectsReducer = (state = projectsInitialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return { ...state, projects: action.payload };
    case SET_ACTIVE_PROJECT:
      return { ...state, activeProjects: action.payload };
    case SET_IS_DENSE:
      return { ...state, isDense: action.payload };
    case SET_SEARCH_FOR:
      return { ...state, searchFor: action.payload };
    default:
      return state;
  }
};
