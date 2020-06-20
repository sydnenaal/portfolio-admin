import { combineReducers } from "redux";

import {
  messagesReducer,
  themeReducer,
  languageReducer,
  projectsReducer,
  visitsReducer,
  userReducer,
  requestsStackReducer,
} from "./reducers";

export const rootReducer = combineReducers({
  messages: messagesReducer,
  projects: projectsReducer,
  theme: themeReducer,
  language: languageReducer,
  visits: visitsReducer,
  user: userReducer,
  requestStack: requestsStackReducer,
});
