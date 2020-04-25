import React from "react";
import { useIntl } from "react-intl";

import PageWithHeader from "../../containers/pageWithHeader";

const MessageCheckPageComponent = ({ id, ...props }) => {
  const {
    messages: { titles },
  } = useIntl();

  return (
    <PageWithHeader title={titles.mail} subtitle={"read"} {...props}>
      <div className="messagePage-container">message id is {id}</div>
    </PageWithHeader>
  );
};

export default MessageCheckPageComponent;
