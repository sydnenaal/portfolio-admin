import { SET_THEME } from "ducks/types";

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

const themeInitialState = {
  theme: localStorage.getItem("theme") || "light",
};

export const themeReducer = (state = themeInitialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};
