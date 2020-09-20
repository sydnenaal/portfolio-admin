import React, {
  useEffect,
  useReducer,
  memo,
  useMemo,
  useCallback,
} from "react";
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
import { setMessages, setTabSortedMessages } from "ducks";

const initialState = {
  messages: [],
  checked: [],
  count: 0,
  activeTab: "",
  search: "",
};

const messagesReducer = (state, action) => {
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
  const { clientWidth } = document.documentElement;
  const buttonsSize = useMemo(() => {
    return clientWidth > 500 ? "small" : "tiny";
  }, [clientWidth]);
  const reduxDispatch = useDispatch();
  const [state, localDispatch] = useReducer(messagesReducer, initialState);

  const renderTabs = useMemo(() => {
    function getTabFromTabName(title, key) {
      const messagesCounter = tabs[title] ? tabs[title].length.toString() : "0";
      const props = { title, key, messagesCounter, locale: mail };

      return <Tab {...props} />;
    }

    return tabsNames.map(getTabFromTabName);
  }, [mail, tabs]);

  const handleSuccess = useCallback(
    (response) => {
      const { data } = response;
      const responseWithChecked = data.map((item) => ({
        ...item,
        isChecked: false,
      }));
      const sortedMessages = sortMessages(responseWithChecked);

      reduxDispatch(setMessages(responseWithChecked));
      reduxDispatch(setTabSortedMessages(sortedMessages));
      localDispatch({ type: "UPDATE_MESSAGES", payload: responseWithChecked });
    },
    [reduxDispatch]
  );

  const handleSetUsualMessages = useCallback(() => {
    const data = { messages: state.checked, action: false };
    const params = {
      ...setPriorityMessages,
      title: "setPriority",
      body: { data },
    };

    reduxDispatch(queryWrapper(params, handleSuccess));
  }, [handleSuccess, reduxDispatch, queryWrapper, state.checked]);

  const handleSetImportantMessages = useCallback(() => {
    const data = { messages: state.checked, action: true };
    const params = {
      ...setPriorityMessages,
      title: "setPriority",
      body: { data },
    };

    reduxDispatch(queryWrapper(params, handleSuccess));
  }, [handleSuccess, reduxDispatch, queryWrapper, state.checked]);

  const handleDeleteMessages = useCallback(() => {
    const data = { messages: state.checked, action: true };
    const params = {
      ...setActualityMessages,
      title: "setActuality",
      body: { data },
    };

    reduxDispatch(queryWrapper(params, handleSuccess));
  }, [handleSuccess, reduxDispatch, queryWrapper, state.checked]);

  const handleReturnMessages = useCallback(() => {
    const data = { messages: state.checked, action: false };
    const params = {
      ...setActualityMessages,
      title: "setActuality",
      body: { data },
    };

    reduxDispatch(queryWrapper(params, handleSuccess));
  }, [handleSuccess, reduxDispatch, queryWrapper, state.checked]);

  const handleCheckAllMessages = useCallback(() => {
    localDispatch({ type: "CHECK_ALL" });
  }, []);

  const handleDropChecksMessages = useCallback(() => {
    localDispatch({ type: "DROP_CHECKS" });
  }, []);

  const handleChangeSearch = useCallback((e) => {
    localDispatch({ type: "SET_SEARCH", payload: e.target.value });
  }, []);

  useEffect(() => {
    localDispatch({ type: "DROP_CHECKS" });
    localDispatch({ type: "SET_ACTIVE_TAB", payload: activeTab });
  }, [activeTab]);

  useEffect(() => {
    localDispatch({ type: "UPDATE_MESSAGES", payload: messages });
  }, [messages]);

  useEffect(() => {
    const queryParams = {
      ...getMessages,
      title: "getMessages",
    };

    function handleSuccess(response) {
      const { data } = response;
      const sorted = sortMessages(data);

      reduxDispatch(setMessages(data));
      reduxDispatch(setTabSortedMessages(sorted));
      localDispatch({ type: "UPDATE_MESSAGES", payload: data });
      helpUserNotify();
    }

    reduxDispatch(queryWrapper(queryParams, handleSuccess));
  }, [reduxDispatch, queryWrapper]);

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

  return (
    <PageWithHeader title={titles.mail}>
      <div className="mailBody">
        <div className="mailActions">
          <div className="search">
            <Input
              value={state.search}
              onChange={handleChangeSearch}
              fluid={clientWidth < 500}
              placeholder={mail.searchPlaceholder}
              icon="search"
            />
          </div>

          <div className="buttons">
            <Button
              size={buttonsSize}
              className="actionButton"
              onClick={handleCheckAllMessages}
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
              disabled={state.count === 0}
            >
              {buttonInfo.message}
            </Button>

            <Button
              size={buttonsSize}
              className="actionButton"
              onClick={handleDeleteMessages}
              disabled={state.count === 0}
            >
              {mail.buttons[activeTab === "trash" ? "remove" : "removeToTrash"]}
            </Button>
          </div>
        </div>

        <Tabs tabs={renderTabs}>
          <WithLoader title="getMessages">
            <Content filter={state.search} checked={state.checked} />
          </WithLoader>
        </Tabs>
      </div>
    </PageWithHeader>
  );
}

export default memo(MailPageComponent);
