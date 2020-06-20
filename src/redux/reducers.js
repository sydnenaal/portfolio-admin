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
  SET_NEW_MESSAGES_COUNTER,
  SET_VISITS,
  SET_USER_DATA,
} from "./types";

const userInitialState = {
  userData: { name: "", photo: "" },
};

const messagesInitialState = {
  messages: null,
  counter: 0,
  tabSortedMessages: [],
  activeMessage: null,
  activeTab: "all",
};

const visitsInitialState = {
  visits: { day: 0, week: 0, month: 0 },
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

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export const messagesReducer = (state = messagesInitialState, action) => {
  switch (action.type) {
    case SET_NEW_MESSAGES_COUNTER:
      return { ...state, counter: action.payload };
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

export const visitsReducer = (state = visitsInitialState, action) => {
  switch (action.type) {
    case SET_VISITS:
      return { ...state, visits: action.payload };
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
