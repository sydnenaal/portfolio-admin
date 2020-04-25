import React, { useEffect, useState } from "react";
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

  !isShow &&
    NotificationManager.info(
      "Воспользуйтесь меню быстрого доступа, кликнув по сообщению правой кнопкой мыши",
      "Подсказка",
      25000,
      () => localStorage.setItem("mailNotify", "showed")
    );
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

  const fetchMessages = async () => {
    setLoading(true);
    const response = await getMessages();
    response &&
      setMessages(
        response.map((item) => ({
          ...item,
          isChecked: false,
        }))
      );
    setLoading(false);
    helpUserNotify();
  };

  useEffect(() => {
    fetchMessages();
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
