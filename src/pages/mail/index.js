import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { store } from "react-notifications-component";

import MainPageComponent from "./component";

import { getMessages } from "ducks";
import { tabsNames, tabFilter } from "constants/messagesConstants";
import { notificationSettings } from "constants/notificationSettings";
import { setAppState, setMessages, setTabSortedMessages } from "redux/actions";
import { selectActiveTab, selectMessages } from "redux/selectors";

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

  const [checked, setChecked] = useState(0);

  const countChecked = (array) => {
    setChecked(
      array.reduce((accum, item) =>
        typeof accum === "object"
          ? accum.isChecked + item.isChecked
          : accum + item.isChecked
      )
    );
  };

  const handleCheck = (id) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: item.id === id ? !item.isChecked : item.isChecked,
    }));

    dispatch(setMessages(checkedMessages));
    countChecked(checkedMessages);
  };

  const handleCheckAll = ({ setCheck }) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: tabFilter[activeTab](item) ? setCheck : item.isChecked,
    }));

    dispatch(setMessages(checkedMessages));
    countChecked(checkedMessages);
  };

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

        const tabs = {};
        tabsNames.forEach((item) => {
          tabs[item] = responseWithChecked.filter(tabFilter[item]);
        });

        dispatch(setMessages(responseWithChecked));
        helpUserNotify();

        dispatch(setTabSortedMessages(tabs));
      }
      dispatch(setAppState(false));
    };

    !messages && fetchMessages(source);

    return () => {
      source.cancel();
    };
  }, [dispatch, messages]);

  return (
    <MainPageComponent
      tabsNames={tabsNames}
      messages={messages}
      handleCheckAll={handleCheckAll}
      handleCheck={handleCheck}
      checked={checked}
    />
  );
};

export default memo(MailPageContainer);
