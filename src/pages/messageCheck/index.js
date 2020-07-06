import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { getMessage, setPriorityMessages, setActualityMessages } from "api";

import MessageCheckComponent from "./component";

const MessageCheckPageContainer = () => {
  const history = useHistory();
  const { message } = useParams();

  const dispatch = useDispatch();

  const handleClickBack = () => history.goBack();
  const handleDelete = useCallback(() => {
    const data = { messages: [message], action: true };
    dispatch(setActualityMessages({ data }));
    history.goBack();
  }, [history, dispatch, message]);
  const handleSetPriority = useCallback(() => {
    const data = { messages: [message], action: true };
    dispatch(setPriorityMessages({ data }));
    history.goBack();
  }, [history, dispatch, message]);

  useEffect(() => {
    let source = axios.CancelToken.source();

    dispatch(
      getMessage({
        data: { _id: message },
        cancelToken: source.token,
        title: "getMessage",
      })
    );

    return () => {
      source.cancel();
    };
  }, [dispatch, message]);

  return (
    <MessageCheckComponent
      handleDelete={handleDelete}
      handleSetPriority={handleSetPriority}
      handleClickBack={handleClickBack}
    />
  );
};

export default MessageCheckPageContainer;
