import {
  SET_MESSAGES,
  SET_THEME,
  SET_LANGUAGE,
  SET_APP_STATE,
  SET_TAB,
  SET_TAB_SORTED_MESSAGES,
  SET_ACTIVE_MESSAGE,
  SET_ACTIVE_PROJECT,
  SET_PROJECTS,
} from "./types";

const messagesInitialState = {
  messages: null,
  tabSortedMessages: [],
  activeMessage: null,
  activeTab: "all",
};

const projectsInitialState = {
  projects: null,
  activeProject: "all",
};

const themeInitialState = {
  theme: localStorage.getItem("theme") || "light",
};

const languageInitialState = {
  language: localStorage.getItem("lang") || "en",
};

const appInitialState = {
  isLoading: false,
};

export const messagesReducer = (state = messagesInitialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_TAB_SORTED_MESSAGES:
      return { ...state, tabSortedMessages: action.payload };
    case SET_TAB:
      return { ...state, activeTab: action.payload };
    case SET_ACTIVE_MESSAGE:
      return { ...state, activeMessage: action.payload };
    default:
      return state;
  }
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

export const themeReducer = (state = themeInitialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const languageReducer = (state = languageInitialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export const appStateReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case SET_APP_STATE:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
