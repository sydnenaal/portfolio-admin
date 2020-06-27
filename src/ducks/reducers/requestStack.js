import { SET_REQUESTS_STACK } from "ducks/types";

export const setRequestStack = (stack) => ({
  type: SET_REQUESTS_STACK,
  payload: stack,
});

const requestsStackInitialState = {
  requestsStack: [],
};

export const requestsStackReducer = (
  state = requestsStackInitialState,
  action
) => {
  switch (action.type) {
    case SET_REQUESTS_STACK:
      return { ...state, requestsStack: action.payload };
    default:
      return state;
  }
};
