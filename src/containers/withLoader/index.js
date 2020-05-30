import React from "react";
import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { selectLoading } from "redux/selectors";

const WithLoader = ({ children }) => {
  const loading = useSelector(selectLoading);
  return <>{loading ? <Loader active inline="centered" /> : children}</>;
};

export default WithLoader;
