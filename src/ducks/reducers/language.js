import { SET_LANGUAGE } from "ducks/types";

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

const languageInitialState = {
  language: localStorage.getItem("lang") || "en",
};

export const languageReducer = (state = languageInitialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
