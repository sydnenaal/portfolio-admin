import React from "react";
import { useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";

import { selectRequestStack } from "selectors";

function WithLoader({ children, title }) {
  const requestStack = useSelector(selectRequestStack);
  const loading = requestStack.indexOf(title) !== -1;

  if (loading) {
    return <Loader active inline="centered" />;
  }

  return children;
}

export default WithLoader;
