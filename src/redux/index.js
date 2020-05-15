import { combineReducers } from "redux";

import {
  messagesReducer,
  themeReducer,
  languageReducer,
  appStateReducer,
} from "./reducers";

export const rootReducer = combineReducers({
  messages: messagesReducer,
  theme: themeReducer,
  language: languageReducer,
  appState: appStateReducer,
});
