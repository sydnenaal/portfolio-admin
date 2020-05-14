import React, { useEffect, useState } from "react";
import axios from "axios";

import { NotificationManager } from "react-notifications";
import MainPageComponent from "./component";

import { getMessages } from "../../ducks";

const tabFilter = {
  all: (item) => !item.isDeleted,
  read: (item) => item.isRead && !item.isDeleted,
  unread: (item) => !item.isRead && !item.isDeleted,
  important: (item) => item.isImportant && !item.isDeleted,
  trash: (item) => item.isDeleted,
};

const helpUserNotify = () => {
  const isShow = localStorage.getItem("mailNotify");

  if (!isShow) {
    localStorage.setItem("mailNotify", "showed");
    NotificationManager.info(
      "Воспользуйтесь меню быстрого доступа, кликнув по сообщению правой кнопкой мыши",
      "Подсказка",
      25000
    );
  }
};

const MailPageContainer = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(0);
  const [messages, setMessages] = useState([]);

  const countChecked = (array) =>
    setChecked(
      array.reduce((accum, item) =>
        typeof accum === "object"
          ? accum.isChecked + item.isChecked
          : accum + item.isChecked
      )
    );

  const handleCheck = (id) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: item.id === id ? !item.isChecked : item.isChecked,
    }));

    setMessages(checkedMessages);
    countChecked(checkedMessages);
  };

  const handleCheckAll = ({ setCheck }) => {
    const checkedMessages = messages.map((item) => ({
      ...item,
      isChecked: tabFilter[activeTab](item) ? setCheck : item.isChecked,
    }));

    setMessages(checkedMessages);
    countChecked(checkedMessages);
  };

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchMessages = async () => {
      setLoading(true);

      const response = await getMessages({
        cancelToken: source.token,
      });

      if (response) {
        const responseWithChecked = response.map((item) => ({
          ...item,
          isChecked: false,
        }));

        setMessages(responseWithChecked);
        helpUserNotify();
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <MainPageComponent
      messages={messages}
      loading={loading}
      handleCheckAll={handleCheckAll}
      handleCheck={handleCheck}
      tabFilter={tabFilter}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      checked={checked}
    />
  );
};

export default React.memo(MailPageContainer);
