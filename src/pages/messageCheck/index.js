import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { getMessage, setPriorityMessages, setActualityMessages } from "api";

import MessageCheckComponent from "./component";

function MessageCheckPageContainer() {
  const history = useHistory();
  const { message } = useParams();
  const dispatch = useDispatch();

  function handleClickBack() {
    history.goBack();
  }

  function handleDelete() {
    const data = { messages: [message], action: true };

    dispatch(setActualityMessages({ data }));
    history.goBack();
  }

  function handleSetPriority() {
    const data = { messages: [message], action: true };

    dispatch(setPriorityMessages({ data }));
    history.goBack();
  }

  useEffect(() => {
    let source = axios.CancelToken.source();
    const params = {
      data: { _id: message },
      cancelToken: source.token,
      title: "getMessage",
    };

    dispatch(getMessage(params));

    return source.cancel;
  }, [dispatch, message]);

  return (
    <MessageCheckComponent
      handleDelete={handleDelete}
      handleSetPriority={handleSetPriority}
      handleClickBack={handleClickBack}
    />
  );
}

export default MessageCheckPageContainer;
