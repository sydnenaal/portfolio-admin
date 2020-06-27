import { SET_VISITS } from "ducks/types";

export const setVisits = (visits) => ({
  type: SET_VISITS,
  payload: visits,
});

const visitsInitialState = {
  visits: { day: 0, week: 0, month: 0 },
};

export const visitsReducer = (state = visitsInitialState, action) => {
  switch (action.type) {
    case SET_VISITS:
      return { ...state, visits: action.payload };
    default:
      return state;
  }
};
