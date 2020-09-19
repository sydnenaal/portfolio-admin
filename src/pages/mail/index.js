import React, { useEffect, useReducer, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import MailPageComponent from "./component";
import { getMessages, setPriorityMessages, setActualityMessages } from "api";
import { tabsNames, tabFilter } from "constants/messagesConstants";
import { selectActiveTab, selectMessages } from "selectors";
import { helpUserNotify } from "utils";

const checkedMessagesReducer = (state, action) => {
  const { messages, count, checked, activeTab } = state;
  const checkAll = () => {
    const checkedItems = messages
      .filter(tabFilter[activeTab])
      .map((item) => item._id);
    return { checked: checkedItems, count: checkedItems.length };
  };

  switch (action.type) {
    case "CHECK_ALL":
      return { ...state, ...checkAll() };
    case "DROP_CHECKS":
      return { ...state, checked: [], count: 0 };
    case "CHECK_SINGLE":
      return {
        ...state,
        checked: [...checked, action.payload],
        count: count + 1,
      };
    case "DROP_SINGLE_CHECK":
      return {
        ...state,
        checked: checked.filter((item) => item !== action.payload),
        count: count - 1,
      };
    case "UPDATE_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

const MailPageContainer = () => {
  const reduxDispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const messages = useSelector(selectMessages);
  const source = axios.CancelToken.source();

  const [state, localDispatch] = useReducer(checkedMessagesReducer, {
    messages,
    checked: [],
    count: 0,
    activeTab,
    search: "",
  });

  const messagesAction = ({ action, title, reduxAction }) => () => {
    const queryData = {
      title: title,
      cancelToken: source.token,
      data: { messages: state.checked, action: action },
    };
    reduxDispatch(reduxAction(queryData));
    localDispatch({ type: "UPDATE_MESSAGES", payload: messages });
  };

  const handleSetUsualMessages = messagesAction({
    action: false,
    title: "setPriority",
    reduxAction: setPriorityMessages,
  });

  const handleSetImportantMessages = messagesAction({
    action: true,
    title: "setPriority",
    reduxAction: setPriorityMessages,
  });

  const handleDeleteMessages = messagesAction({
    action: true,
    title: "setActuality",
    reduxAction: setActualityMessages,
  });

  const handleReturnMessages = messagesAction({
    action: false,
    title: "setActuality",
    reduxAction: setActualityMessages,
  });

  const handleCheckAllMessages = () => localDispatch({ type: "CHECK_ALL" });
  const handleDropChecksMessages = () => localDispatch({ type: "DROP_CHECKS" });
  const handleChangeSearch = (e) =>
    localDispatch({ type: "SET_SEARCH", payload: e.target.value });

  useEffect(() => {
    localDispatch({ type: "DROP_CHECKS" });
    localDispatch({ type: "SET_ACTIVE_TAB", payload: activeTab });
  }, [activeTab]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const queryParams = {
      cancelToken: source.token,
      title: "getMessages",
      successCallbackFromUI: (response) => {
        localDispatch({ type: "UPDATE_MESSAGES", payload: response });
        helpUserNotify();
      },
    };
    reduxDispatch(getMessages(queryParams));

    return source.cancel;
  }, [reduxDispatch]);

  return (
    <MailPageComponent
      tabsNames={tabsNames}
      messages={messages}
      handleDropChecksMessages={handleDropChecksMessages}
      handleCheckAll={handleCheckAllMessages}
      handleReturnMessages={handleReturnMessages}
      handleDeleteMessages={handleDeleteMessages}
      handleSetImportantMessages={handleSetImportantMessages}
      handleSetUsualMessages={handleSetUsualMessages}
      handleChangeSearch={handleChangeSearch}
      checked={state.checked}
      search={state.search}
      checkedCount={state.count}
      dispatch={localDispatch}
    />
  );
};

export default memo(MailPageContainer);
