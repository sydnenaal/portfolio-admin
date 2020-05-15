import {
  SET_MESSAGES,
  SET_LANGUAGE,
  SET_THEME,
  SET_APP_STATE,
  SET_TAB,
  SET_TAB_SORTED_MESSAGES,
  SET_ACTIVE_MESSAGE,
  SET_ACTIVE_PROJECT,
  SET_PROJECTS,
} from "./types";

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

export const setActiveProject = (activeProject) => ({
  type: SET_ACTIVE_PROJECT,
  payload: activeProject,
});

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setTabSortedMessages = (tabSortedMessages) => ({
  type: SET_TAB_SORTED_MESSAGES,
  payload: tabSortedMessages,
});

export const setActiveMessage = (activeMessage) => ({
  type: SET_ACTIVE_MESSAGE,
  payload: activeMessage,
});

export const setTab = (tab) => ({
  type: SET_TAB,
  payload: tab,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setAppState = (state) => ({
  type: SET_APP_STATE,
  payload: state,
});
