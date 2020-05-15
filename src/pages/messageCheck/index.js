import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { getMessages } from "../../ducks";

import { tabsNames, tabFilter } from "../../constants/messagesConstants";

import MessageCheckComponent from "./component";

import {
  setActiveMessage,
  setMessages,
  setTabSortedMessages,
  setAppState,
} from "../../redux/actions";

const MessageCheckPageContainer = ({
  setActiveMessage,
  setMessages,
  setTabs,
  setAppState,
  messages,
}) => {
  const history = useHistory();
  const { message } = useParams();

  const handleClickBack = () => history.goBack();

  const fetchMessages = async (source) => {
    setAppState(true);

    const response = await getMessages({
      cancelToken: source.token,
    });

    if (response) {
      const responseWithChecked = response.map((item) => ({
        ...item,
        isChecked: false,
      }));

      const tabs = {};
      tabsNames.forEach((item) => {
        tabs[item] = responseWithChecked.filter(tabFilter[item]);
      });

      setMessages(responseWithChecked);
      setTabs(tabs);
      setActiveMessage(
        responseWithChecked.filter(
          (item) => item.id.toString() === message.toString()
        )[0]
      );
    }
    setAppState(false);
  };

  useEffect(() => {
    let source = axios.CancelToken.source();

    !messages && fetchMessages(source);

    return () => {
      source.cancel();
    };
  }, [fetchMessages]);

  return <MessageCheckComponent handleClickBack={handleClickBack} />;
};

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
});

const mapDispatchToProps = {
  setActiveMessage: setActiveMessage,
  setMessages: setMessages,
  setTabs: setTabSortedMessages,
  setAppState: setAppState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageCheckPageContainer);
