import { combineReducers } from "redux";

import {
  messagesReducer,
  themeReducer,
  languageReducer,
  projectsReducer,
  visitsReducer,
  userReducer,
  requestsStackReducer,
  contactsReducer,
} from "./reducers";

export const rootReducer = combineReducers({
  messages: messagesReducer,
  projects: projectsReducer,
  theme: themeReducer,
  language: languageReducer,
  visits: visitsReducer,
  user: userReducer,
  requestStack: requestsStackReducer,
  contacts: contactsReducer,
});

export * from "./reducers";
