import { combineReducers } from "redux";

import {
  messagesReducer,
  themeReducer,
  languageReducer,
  appStateReducer,
  projectsReducer,
  visitsReducer,
  userReducer,
} from "./reducers";

export const rootReducer = combineReducers({
  messages: messagesReducer,
  projects: projectsReducer,
  theme: themeReducer,
  language: languageReducer,
  appState: appStateReducer,
  visits: visitsReducer,
  user: userReducer,
});
