import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { getMessages } from "ducks";

import { tabsNames, tabFilter } from "constants/messagesConstants";

import MessageCheckComponent from "./component";

import {
  setActiveMessage,
  setMessages,
  setTabSortedMessages,
  setAppState,
} from "redux/actions";

const MessageCheckPageContainer = () => {
  const history = useHistory();
  const { message } = useParams();

  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();

  const handleClickBack = () => history.goBack();

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchMessages = async (source) => {
      dispatch(setAppState(true));

      const response = await getMessages({
        cancelToken: source.token,
      });

      if (response) {
        const responseWithChecked = response.map((item) => ({
          ...item,
          isChecked: false,
        }));

        const activeMessage = responseWithChecked.filter(
          (item) => item.id.toString() === message.toString()
        )[0];

        const tabs = {};
        tabsNames.forEach((item) => {
          tabs[item] = responseWithChecked.filter(tabFilter[item]);
        });

        dispatch(setMessages(responseWithChecked));
        dispatch(setTabSortedMessages(tabs));
        dispatch(setActiveMessage(activeMessage));
      }
      dispatch(setAppState(false));
    };

    !messages && fetchMessages(source);

    return () => {
      source.cancel();
    };
  }, [messages, dispatch, message]);

  return <MessageCheckComponent handleClickBack={handleClickBack} />;
};

export default MessageCheckPageContainer;
