import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { getMessages } from "ducks";
import { setActiveMessage } from "redux/actions";

import MessageCheckComponent from "./component";

const MessageCheckPageContainer = () => {
  const history = useHistory();
  const { message } = useParams();

  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();

  const handleClickBack = () => history.goBack();

  useEffect(() => {
    let source = axios.CancelToken.source();

    !messages &&
      dispatch(
        getMessages({
          cancelToken: source.token,
          successCallback: (responseWithChecked) => {
            const activeMessage = responseWithChecked.filter(
              (item) => item.id.toString() === message.toString()
            )[0];
            dispatch(setActiveMessage(activeMessage));
          },
        })
      );

    return () => {
      source.cancel();
    };
  }, [messages, dispatch, message]);

  return <MessageCheckComponent handleClickBack={handleClickBack} />;
};

export default MessageCheckPageContainer;
