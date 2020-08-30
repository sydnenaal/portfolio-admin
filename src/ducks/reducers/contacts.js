import { SET_CONTACTS } from "ducks/types";

export const setContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: contacts,
});

const contactsInitialState = {
  contacts: null,
};

export const contactsReducer = (state = contactsInitialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};
