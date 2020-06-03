import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthComponent from "./pages/auth";
import MainPageComponent from "./pages/main";
import SettingsPageComponent from "./pages/settings";
import ProjectsPageComponent from "./pages/projects";
import MailPageComponent from "./pages/mail";
import MessageCheckPageComponent from "./pages/messageCheck";
import ProjectsSavePageComponent from "./pages/projectsSave";

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
  getToken: () => localStorage.getItem("token"),
});

const AuthRoute = customRoute({
  path: "/",
  getToken: () => !localStorage.getItem("token"),
});

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/mail/:message">
        <MessageCheckPageComponent />
      </ProtectedRoute>

      <ProtectedRoute path="/projects/:project">
        <ProjectsSavePageComponent />
      </ProtectedRoute>

      <ProtectedRoute path="/projects">
        <ProjectsPageComponent />
      </ProtectedRoute>

      <ProtectedRoute path="/mail">
        <MailPageComponent />
      </ProtectedRoute>

      <ProtectedRoute path="/settings">
        <SettingsPageComponent />
      </ProtectedRoute>

      <AuthRoute path="/auth">
        <AuthComponent />
      </AuthRoute>

      <ProtectedRoute path="/">
        <MainPageComponent />
      </ProtectedRoute>
    </Switch>
  );
};

export default Routes;
