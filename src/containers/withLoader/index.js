import React from "react";
import { useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";

import { selectRequestStack } from "selectors";

const WithLoader = ({ children, title }) => {
  const requestStack = useSelector(selectRequestStack);
  const loading = requestStack.indexOf(title) !== -1;

  return <>{loading ? <Loader active inline="centered" /> : children}</>;
};

export default WithLoader;
