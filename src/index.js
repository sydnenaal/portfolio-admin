import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.sass";
import App from "./App";
import "animate.css";
import "semantic-ui-css/semantic.min.css";
import "react-notifications-component/dist/theme.css";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { rootReducer } from "./redux";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
