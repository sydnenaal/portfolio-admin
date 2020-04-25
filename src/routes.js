import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthComponent from "./pages/auth";
import MainPageComponent from "./pages/main";
import SettingsPageComponent from "./pages/settings";
import ProjectsPageComponent from "./pages/projects";
import MailPageComponent from "./pages/mail";
import MessageCheckPageComponent from "./pages/messageCheck";

const customRoute = ({ path, getToken }) => ({ children, ...props }) => {
  const renderFunc = ({ location }) => {
    const redirectConfig = {
      pathname: path,
      state: { from: location },
    };

    return getToken() ? children : <Redirect to={redirectConfig} />;
  };

  return <Route path={props.path} render={renderFunc}></Route>;
};

const ProtectedRoute = customRoute({
  path: "/auth",
  getToken: () => localStorage.getItem("isAuth"),
});

const AuthRoute = customRoute({
  path: "/",
  getToken: () => !localStorage.getItem("isAuth"),
});

const Routes = (props) => {
  return (
    <Switch>
      <ProtectedRoute path="/mail/:message">
        <MessageCheckPageComponent {...props} />
      </ProtectedRoute>

      <ProtectedRoute path="/projects">
        <ProjectsPageComponent {...props} />
      </ProtectedRoute>

      <ProtectedRoute path="/mail">
        <MailPageComponent {...props} />
      </ProtectedRoute>

      <ProtectedRoute path="/settings">
        <SettingsPageComponent {...props} />
      </ProtectedRoute>

      <AuthRoute path="/auth">
        <AuthComponent {...props} />
      </AuthRoute>

      <ProtectedRoute path="/">
        <MainPageComponent {...props} />
      </ProtectedRoute>
    </Switch>
  );
};

export default Routes;
