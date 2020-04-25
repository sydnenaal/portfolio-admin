import React from "react";
import { useParams } from "react-router-dom";

import MessageCheckComponent from "./component";

const MessageCheckPageContainer = ({ ...props }) => {
  const { message } = useParams();

  return <MessageCheckComponent id={message} {...props} />;
};

export default MessageCheckPageContainer;
