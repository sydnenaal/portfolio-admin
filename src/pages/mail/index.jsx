import React, { useEffect, useReducer, memo, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import { useIntl } from "react-intl";

import "./style.sass";
import {
  selectActiveTab,
  selectSortedMessages,
  selectMessages,
} from "selectors";
import PageWithHeader from "containers/pageWithHeader";
import { Tab, Content } from "./components/tab";
import Tabs from "containers/tabs";
import WithLoader from "containers/withLoader";
import { getMessages, setPriorityMessages, setActualityMessages } from "api";
import { tabsNames, tabFilter } from "constants/messagesConstants";
import { helpUserNotify, sortMessages } from "utils";
import { useRequest } from "hooks";
import { setMessages } from "ducks";

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

function MailPageComponent() {
  const {
    messages: { titles, mail },
  } = useIntl();

  const tabs = useSelector(selectSortedMessages);
  const activeTab = useSelector(selectActiveTab);
  const messages = useSelector(selectMessages);
  const queryWrapper = useRequest();
  const buttonsSize = useMemo(() => {
    const { clientWidth } = document.documentElement;

    return clientWidth > 500 ? "small" : "tiny";
  }, []);
  const reduxDispatch = useDispatch();
  const [state, localDispatch] = useReducer(checkedMessagesReducer, {
    messages,
    checked: [],
    count: 0,
    activeTab,
    search: "",
  });
  const renderTabs = useMemo(() => {
    function getTabFromTabName(title, key) {
      const messagesCounter = tabs[title] ? tabs[title].length.toString() : "0";
      const props = { title, key, messagesCounter, locale: mail };

      return <Tab {...props} />;
    }

    return tabsNames.map(getTabFromTabName);
  }, [tabsNames, mail, tabs]);
  const buttonInfo = useMemo(() => {
    switch (activeTab) {
      case "trash":
        return {
          handler: handleReturnMessages,
          message: mail.buttons.undoDelete,
        };
      case "important":
        return {
          handler: handleSetUsualMessages,
          message: mail.buttons.checkAsUsual,
        };
      default:
        return {
          handler: handleSetImportantMessages,
          message: mail.buttons.checkAsImportant,
        };
    }
  }, [
    activeTab,
    mail,
    handleReturnMessages,
    handleSetUsualMessages,
    handleSetImportantMessages,
  ]);

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
    const queryParams = {
      ...getMessages,
      title: "getMessages",
    };

    function handleSuccess() {
      dispatch(setMessages(response.data));
      sortMessages({ messages: response.data, dispatch: dispatch });
      localDispatch({ type: "UPDATE_MESSAGES", payload: response });
      helpUserNotify();
    }

    reduxDispatch(queryWrapper(queryParams, handleSuccess));
  }, [reduxDispatch]);

  return (
    <PageWithHeader title={titles.mail}>
      <div className="mailBody">
        <div className="mailActions">
          <div className="search">
            <Input
              value={search}
              onChange={handleChangeSearch}
              fluid={screenWidth < 500}
              placeholder={mail.searchPlaceholder}
              icon="search"
            />
          </div>

          <div className="buttons">
            <Button
              size={buttonsSize}
              className="actionButton"
              onClick={handleCheckAll}
            >
              {mail.buttons.checkAll}
            </Button>

            <Button
              size={buttonsSize}
              className="actionButton"
              onClick={handleDropChecksMessages}
            >
              {mail.buttons.uncheckAll}
            </Button>

            <Button
              size={buttonsSize}
              className="actionButton"
              onClick={buttonInfo.handler}
              disabled={checkedCount === 0}
            >
              {buttonInfo.message}
            </Button>

            <Button
              size={buttonsSize}
              className="actionButton"
              onClick={handleDeleteMessages}
              disabled={checkedCount === 0}
            >
              {mail.buttons[activeTab === "trash" ? "remove" : "removeToTrash"]}
            </Button>
          </div>
        </div>

        <Tabs tabs={renderTabs}>
          <WithLoader title="getMessages">
            <Content filter={search} dispatch={dispatch} checked={checked} />
          </WithLoader>
        </Tabs>
      </div>
    </PageWithHeader>
  );
}

export default memo(MailPageComponent);
