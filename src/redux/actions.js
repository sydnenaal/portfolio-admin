import {
  SET_MESSAGES,
  SET_LANGUAGE,
  SET_THEME,
  SET_APP_STATE,
  SET_TAB,
} from "./types";

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
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
