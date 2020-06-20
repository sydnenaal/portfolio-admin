import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { getMessage, setPriorityMessages, setActualityMessages } from "ducks";

import MessageCheckComponent from "./component";

const MessageCheckPageContainer = () => {
  const history = useHistory();
  const { message } = useParams();

  const dispatch = useDispatch();

  const handleClickBack = () => history.goBack();
  const handleDelete = () => {
    dispatch(
      setActualityMessages({
        data: { messages: [message], action: true },
      })
    );
    history.goBack();
  };
  const handleSetPriority = () => {
    dispatch(
      setPriorityMessages({
        data: { messages: [message], action: true },
      })
    );
    history.goBack();
  };

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
