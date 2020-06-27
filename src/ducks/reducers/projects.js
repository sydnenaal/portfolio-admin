import { SET_ACTIVE_PROJECT, SET_PROJECTS } from "ducks/types";

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const setActiveProject = (activeProject) => ({
  type: SET_ACTIVE_PROJECT,
  payload: activeProject,
});

const projectsInitialState = {
  projects: null,
  activeProject: "all",
};

export const projectsReducer = (state = projectsInitialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return { ...state, projects: action.payload };
    case SET_ACTIVE_PROJECT:
      return { ...state, activeProjects: action.payload };
    default:
      return state;
  }
};
