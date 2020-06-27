import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { store } from "react-notifications-component";

import MailPageComponent from "./component";

import { getMessages, setPriorityMessages, setActualityMessages } from "api";
import { tabsNames, tabFilter } from "constants/messagesConstants";
import { notificationSettings } from "constants/notificationSettings";
import { setMessages } from "redux/actions";
import { selectActiveTab, selectMessages } from "redux/selectors";
import { sortMessages } from "utils/getTabSortedMessages";

const helpUserNotify = () => {
  const isShow = localStorage.getItem("mailNotify");

  if (!isShow) {
    localStorage.setItem("mailNotify", "showed");
    store.addNotification({
      ...notificationSettings,
      title: "Подсказка",
      message:
        "Воспользуйтесь меню быстрого доступа, кликнув по сообщению правой кнопкой мыши",
      type: "info",
      dismiss: {
        duration: 25000,
      },
    });
  }
};

const MailPageContainer = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const messages = useSelector(selectMessages);
  const source = axios.CancelToken.source();

  const [checked, setChecked] = useState(0);

  const countChecked = (array) => {
    const checkedCount = array.reduce(
      (acc, item) => acc + Number(item.isChecked),
      0
    );

    setChecked(checkedCount);
  };
  const getCheckedMessages = () =>
    messages.filter((item) => item.isChecked).map((item) => item._id);
  const priorityAction = ({ action }) => () => {
    const checkedMessages = getCheckedMessages();
    dispatch(
      setPriorityMessages({
        title: "setPriority",
        cancelToken: source.token,
        data: { messages: checkedMessages, action: action },
      })
    );
    setChecked(0);
  };
  const actualityAction = ({ action }) => () => {
    const checkedMessages = getCheckedMessages();
    dispatch(
      setActualityMessages({
        title: "setActuality",
        cancelToken: source.token,
        data: { messages: checkedMessages, action: action },
      })
    );
    setChecked(0);
  };

  const handleSetUsualMessages = priorityAction({ action: false });
  const handleSetImportantMessages = priorityAction({ action: true });
  const handleDeleteMessages = actualityAction({ action: true });
  const handleReturnMessages = actualityAction({ action: false });
  const handleCheck = (id) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: item.id === id ? !item.isChecked : item.isChecked,
    }));

    sortMessages({ messages: checkedMessages, dispatch: dispatch });
    dispatch(setMessages(checkedMessages));
    countChecked(checkedMessages);
  };
  const handleCheckAll = ({ setCheck }) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: tabFilter[activeTab](item) ? setCheck : item.isChecked,
    }));

    sortMessages({ messages: checkedMessages, dispatch: dispatch });
    dispatch(setMessages(checkedMessages));
    countChecked(checkedMessages);
  };

  useEffect(() => {
    setChecked(0);
  }, [setChecked, activeTab]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    dispatch(
      getMessages({
        cancelToken: source.token,
        title: "getMessages",
        successCallbackFromUI: (_) => {
          helpUserNotify();
        },
      })
    );

    return () => {
      source.cancel();
    };
  }, [dispatch]);

  return (
    <MailPageComponent
      tabsNames={tabsNames}
      messages={messages}
      handleCheckAll={handleCheckAll}
      handleCheck={handleCheck}
      handleReturnMessages={handleReturnMessages}
      handleDeleteMessages={handleDeleteMessages}
      handleSetImportantMessages={handleSetImportantMessages}
      handleSetUsualMessages={handleSetUsualMessages}
      checked={checked}
    />
  );
};

export default memo(MailPageContainer);
