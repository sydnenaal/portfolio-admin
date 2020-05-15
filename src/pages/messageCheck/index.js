import React from "react";
import { useHistory } from "react-router-dom";

import MessageCheckComponent from "./component";

const MessageCheckPageContainer = () => {
  const history = useHistory();

  const handleClickBack = () => history.goBack();

  return <MessageCheckComponent handleClickBack={handleClickBack} />;
};

export default MessageCheckPageContainer;
