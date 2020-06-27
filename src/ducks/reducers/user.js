import { SET_USER_DATA } from "ducks/types";

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

const userInitialState = {
  userData: { name: "", photo: "" },
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
